import React, { useEffect, useRef, useState } from "react";
// import "./styles.css";

function TestCanvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  
  

  const [undoSteps, setUndoSteps] = useState({});
  const [redoStep, setRedoStep] = useState({});

  const [undo, setUndo] = useState(0);
  const [redo, setRedo] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const initialState ={
    isDown: false,
    previousPointX:"",
    previousPointY:"",
    image:"",
    undo: false,
    undoImage: [],
    currentX: "",
    currentY: "",
    fromTooth: "",
    toTooth: "",
  }

  const[state,setState]=useState({...initialState})

  

  const onMouseDown = ( {nativeEvent}) => { 
    
    const { offsetX, offsetY } = nativeEvent;

   
    setState(
      {
        isDown: true,
        previousPointX: offsetX,
        previousPointY: offsetY,
      },)     
        // let offsetX = 10;
        // let offsetY = 10;
        // const canvas = canvasRef.current;
        // const ctx = canvas.getContext("2d");
        contextRef.current.beginPath();
       contextRef.current.moveTo(offsetX, offsetY); //start point
       contextRef.current.setLineDash([1,2]); //pattern of line set here
       contextRef.current.lineWidth = 10; //line width
       contextRef.current.lineTo(offsetX, offsetY); // end point of line
       contextRef.current.strokeStyle = "#FF0000";
       contextRef.current.stroke();
        // var image = canvas
        //   .toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream");
        // let array = state.undoImage;
        // array.push(image);
        // setState({ undoImage: array });      
    }

  const onMouseUp = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent;

    setState({
      isDown: false,
      currentX: offsetX,
      currentY: offsetY,
    });
    //if(this.state.isDown){
    var x = offsetX;
    var y = offsetY;
   
    // var ctx = canvas.getContext("2d");
    contextRef.current.moveTo(state.previousPointX, state.previousPointY);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    contextRef.current.closePath();
    
  };

  

  function reset(){
  
    // this.props.toggle(image)
    // const canvas = ReactDOM.findDOMNode(this.refs.canvas);
  //  const contextRef.current = canvas.getContext("2d");
    contextRef.current.clearRect(0, 0, 1040, 105);
   setState(initialState)
   
}

function save(){
    const canvas = canvasRef.current;
    var image = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
    setState({ image: image });
}
let image = new Image();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
  
    image.src=state.image
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 1040, 105);
    contextRef.current = ctx;
    
  }, []);

  useEffect(() => {
    image.src=state.image
    console.log(state.image)
  }, [state]);

  return (
    <>
      <p>check</p>     
      <button type="button"  onClick={reset}>
        Reset
      </button>
     
      <button type="button"  onClick={save}>
      save
      </button>
      <canvas
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default TestCanvas;