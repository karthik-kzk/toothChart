import React, { useState } from "react";

function Rough() {
  const [toggle, setToggle] = useState(false);

  const array = [
    { id: 1, name: 1 },
    { id: 2, name: 1 },
    { id: 3, name: 1 },
    { id: 4, name: 1 },
  ];

  const view = array.map((val, i) => {
    return (
      <div id={val.id}>
        <h1>{val.name}</h1>
        <div>
          <button onClick={() => setToggle(!toggle)}>edit </button>
        </div>
      </div>
    );
  });
  const editView = array.map((val, i) => {
    return (
      <tr>
        <td>
          <input id={val.id}></input>
        </td>
        <td>
          <input></input>
        </td>
        <td>
          <input></input>
        </td>
        <td>
          <button onClick={() => setToggle(!toggle)}>cancel </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {/* {view} */}
      {toggle ? editView : view}
    </div>
  );
}

export default Rough;

import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function App(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const ctx = contextRef.current.getContext("2d");

  const [undoSteps, setUndoSteps] = useState({});
  const [redoStep, setRedoStep] = useState({});

  const [undo, setUndo] = useState(0);
  const [redo, setRedo] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const [state, setState] = useState({
    isDown: false,
    previousPointX: "",
    previousPointY: "",
    image: "",
    undo: false,
    undoImage: [],
    currentX: "",
    currentY: "",
    fromTooth: "",
    toTooth: "",
  });

  const onMouseDown = (event) => {
    setState({
      isDown: true,
      previousPointX: event.offsetX,
      previousPointY: event.offsetY,
    });
    var x = event.offsetX;
    var y = event.offsetY;
    ctx.moveTo(x, y); //start point
    ctx.setLineDash([1, 2]); //pattern of line set here
    ctx.lineWidth = 10; //line width
    ctx.lineTo(x, y); // end point of line
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let array = state.undoImage;
    array.push(image);
    setState({ undoImage: array });
  };

  const onMouseUp = (event) => {
    setState({
      isDown: false,
      currentX: event.offsetX,
      currentY: event.offsetY,
    });
    //if(this.state.isDown){
    // const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    var x = event.offsetX;
    var y = event.offsetY;
    // var ctx = canvas.getContext("2d");
    ctx.moveTo(state.previousPointX, state.previousPointY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  };

  // const onMouseMove = ({ nativeEvent }) => {
  //   if (!isDrawing) {
  //     return;
  //   }
  //   const { offsetX, offsetY } = nativeEvent;
  //   contextRef.current.lineTo(offsetX, offsetY);
  //   contextRef.current.stroke();
  //   const temp = {
  //     ...undoSteps
  //   };
  //   temp[undo].push({ offsetX, offsetY });
  //   setUndoSteps(temp);
  // };

  const undoLastOperation = () => {
    if (undo > 0) {
      const data = undoSteps[undo];
      contextRef.current.strokeStyle = "white";
      contextRef.current.beginPath();
      contextRef.current.lineWidth = 5;
      contextRef.current.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          contextRef.current.lineTo(item.offsetX, item.offsetY);
          contextRef.current.stroke();
        }
      });
      contextRef.current.closePath();
      contextRef.current.strokeStyle = "black";
      const temp = {
        ...undoSteps,
        [undo]: [],
      };
      const te = {
        ...redoStep,
        [redo + 1]: [...data],
      };
      setUndo(undo - 1);
      setRedo(redo + 1);
      setRedoStep(te);
      setUndoSteps(temp);
    }
  };

  const redoLastOperation = () => {
    if (redo > 0) {
      const data = redoStep[redo];
      contextRef.current.strokeStyle = "black";
      contextRef.current.beginPath();
      contextRef.current.lineWidth = 5;
      contextRef.current.moveTo(data[0].offsetX, data[0].offsetY);
      data.forEach((item, index) => {
        if (index !== 0) {
          contextRef.current.lineTo(item.offsetX, item.offsetY);
          contextRef.current.stroke();
        }
      });
      contextRef.current.closePath();
      const temp = {
        ...redoStep,
        [redo]: [],
      };
      setUndo(undo + 1);
      setRedo(redo - 1);
      setRedoStep(temp);
      setUndoSteps({
        ...undoSteps,
        [undo + 1]: [...data],
      });
    }
  };

  function reset() {
    let image = "";
    // this.props.toggle(image)
    // const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    //  const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1040, 105);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  return (
    <>
      <p>check</p>
      <button type="button" disabled={undo === 0} onClick={undoLastOperation}>
        Undo
      </button>
      &nbsp;
      <button type="button" disabled={redo === 0} onClick={redoLastOperation}>
        Redo
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <canvas
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        // onMouseMove={ onMouseMove}
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default App;

const logs = {
  id: 18,
  name: "tooth18",
  date:"",
  value: 0,
  log: "",
  bracket: false,
  bracketStartsHere: false,
  bracketRangeComment: "",
  bracketRangeArray: [],
  bracketIconValue: 0,
  bracketRangeEndToothName: "",
  wire: false,
  wireStartsHere: false,
  wireRangeComment: "",
  wireRangeEndToothName: "",
  wireRangeArray: [],
  chain: false,
  chainStartsHere: false,
  chainRangeComment: "",
  chainRangeEndToothName: "",
  chainRangeArray: [],
  chainIconValue: 0,
  coiledSpring: false,
  CanvasImage: "",
  rubberBand: false,  
};




{log_id: 1	,  id:18,	name:"tooth18", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 2	,  id:17,	name:"tooth17", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 3	,  id:16,	name:"tooth16", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 4	,  id:15,	name:"tooth15", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 5	,  id:14,	name:"tooth14", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 6	,  id:13,	name:"tooth13", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 7	,  id:12,	name:"tooth12", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 8	,  id:11,	name:"tooth11", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 9	,  id:21,	name:"tooth21", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 10,	 id:22	,name:"tooth22", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 11,	 id:23	,name:"tooth23", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 12,	 id:24	,name:"tooth24", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 13,	 id:25	,name:"tooth25", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 14,	 id:26	,name:"tooth26", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 15,	 id:27	,name:"tooth27", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 16,	 id:28	,name:"tooth28", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 17,	 id:38	,name:"tooth38", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 18,	 id:37	,name:"tooth37", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 19,	 id:36	,name:"tooth36", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 20,	 id:35	,name:"tooth35", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 21,	 id:34	,name:"tooth34", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 22,	 id:33	,name:"tooth33", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 23,	 id:32	,name:"tooth32", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 24,	 id:31	,name:"tooth31", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 25,	 id:41	,name:"tooth41", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 26,	 id:42	,name:"tooth42", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 27,	 id:43	,name:"tooth43", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 28,	 id:44	,name:"tooth44", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 29,	 id:45	,name:"tooth45", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 30,	 id:46	,name:"tooth46", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 31,	 id:47	,name:"tooth47", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},
{log_id: 32,	 id:48	,name:"tooth48", date: "",
    value: 0,
    log: "",
    bracket: false,
    bracketStartsHere: false,
    bracketRangeComment: "",
    bracketRangeArray: [],
    bracketIconValue: 0,
    bracketRangeEndToothName:"",
    wire: false,
    wireStartsHere: false,
    wireRangeComment: "",
    wireRangeEndToothName: "",
    wireRangeArray: [],
    chain: false,
    chainStartsHere: false,
    chainRangeComment: "",
    chainRangeEndToothName: "",
    chainRangeArray: [],
    chainIconValue: 0,
    coiledSpring: false,
    CanvasImage: "",
    rubberBand: false,
    rubberBandComment: "",
    coiledSpringComment: "",},

    tooth11:  "../images/Ortho-teeth/1stquadrant/11.png";
    tooth12:  "../images/Ortho-teeth/1stquadrant/12.png";
    tooth13:  "../images/Ortho-teeth/1stquadrant/13.png";
    tooth14:  "../images/Ortho-teeth/1stquadrant/14.png";
    tooth15:  "../images/Ortho-teeth/1stquadrant/15.png";
    tooth16:  "../images/Ortho-teeth/1stquadrant/16.png";
    tooth17:  "../images/Ortho-teeth/1stquadrant/17.png";
    tooth18:  "../images/Ortho-teeth/1stquadrant/18.png";
    tooth21:  "../images/Ortho-teeth/2ndquadrant/21.png";
    tooth22:  "../images/Ortho-teeth/2ndquadrant/22.png";
    tooth23:  "../images/Ortho-teeth/2ndquadrant/24.png";
    tooth24:  "../images/Ortho-teeth/2ndquadrant/24.png";
    tooth25:  "../images/Ortho-teeth/2ndquadrant/25.png";
    tooth26:  "../images/Ortho-teeth/2ndquadrant/26.png";
    tooth27:  "../images/Ortho-teeth/2ndquadrant/27.png";
    tooth28:  "../images/Ortho-teeth/2ndquadrant/28.png"
    tooth41:  "../images/Ortho-teeth/3rdquadrant/31.png";
    tooth42:  "../images/Ortho-teeth/3rdquadrant/32.png";
    tooth43:  "../images/Ortho-teeth/3rdquadrant/33.png";
    tooth44:  "../images/Ortho-teeth/3rdquadrant/34.png";
    tooth45:  "../images/Ortho-teeth/3rdquadrant/35.png";
    tooth46:  "../images/Ortho-teeth/3rdquadrant/36.png";
    tooth47:  "../images/Ortho-teeth/3rdquadrant/37.png";
    tooth48:  "../images/Ortho-teeth/3rdquadrant/38.png";
    tooth31:  "../images/Ortho-teeth/4thquadrant/41.png";
    tooth32:  "../images/Ortho-teeth/4thquadrant/42.png";
    tooth33:  "../images/Ortho-teeth/4thquadrant/43.png";
    tooth34:  "../images/Ortho-teeth/4thquadrant/44.png";
    tooth35:  "../images/Ortho-teeth/4thquadrant/45.png";
    tooth36:  "../images/Ortho-teeth/4thquadrant/46.png";
    tooth37:  "../images/Ortho-teeth/4thquadrant/47.png";
    tooth38:  "../images/Ortho-teeth/4thquadrant/48.png";


    bracket: false,
wire: false,
chain: false,
coiledSpring: false,
rubberBand: false,
cavity:false,
implant:false,
   