import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    //added state
    this.state = {
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
      logComments:[],
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.save = this.save.bind(this);
    this.undo = this.undo.bind(this);
    this.fromTooth = this.fromTooth.bind(this);
    this.toTooth = this.toTooth.bind(this);
    this.reset = this.reset.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  //  css style here for buttons
  

  fromTooth() {
    if (this.state.previousPointX <= 519 && this.state.previousPointY <= 37) {
      this.setState({ fromTooth: "1st  quadrant" });
    } else if (
      this.state.previousPointX <= 1034 &&
      this.state.previousPointY <= 37
    ) {
      this.setState({ fromTooth: "2nd  quadrant" });
    } else if (
      this.state.previousPointX <= 519 &&
      this.state.previousPointY <= 98
    ) {
      this.setState({ fromTooth: "3rd  quadrant" });
    } else {
      this.setState({ fromTooth: "4th  quadrant" });
    }
    // this.setState.tooth('1st or 2nd quadrant')
    // alert("hi")
  }

  toTooth() {
    if (this.state.currentX <= 519 && this.state.currentY <= 37) {
      this.setState({ toTooth: "1st  quadrant" });
    } else if (this.state.currentX <= 1034 && this.state.currentY <= 37) {
      this.setState({ toTooth: "2nd  quadrant" });
    } else if (this.state.currentX <= 519 && this.state.currentY <= 98) {
      this.setState({ toTooth: "3rd  quadrant" });
    } else {
      this.setState({ toTooth: "4th  quadrant" });
    }
  }

  handleMouseDown(event) {
    //added code here
    // console.log(event);
    // let array = [];
    // array.push(1);
    this.setState(
      {
        isDown: true,
        previousPointX: event.offsetX,
        previousPointY: event.offsetY,
      },
      () => {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        var x = event.offsetX;
        var y = event.offsetY;
        var ctx = canvas.getContext("2d");

        // ctx.lineTo(x + 1, y + 1);
        ctx.beginPath();
        // for spring line
        if (this.props.solution.rubberBandApplied) {
          ctx.strokeStyle = "#e75480";
          ctx.lineCap ="round";
          ctx.moveTo(x, y); //start point
          ctx.lineTo(x, y); // end point of line
          // ctx.moveTo(x + 10, y + 10); //start point
          // ctx.lineTo(x + 10, y + 10); // end point of line
          ctx.setLineDash([]);
          ctx.lineWidth = 15;
        
        } else {
    
          ctx.setLineDash([1, 2]); //pattern of line set here
          ctx.lineCap ="butt";
          ctx.lineWidth = 15; //line width
          ctx.moveTo(x, y); //start point
          ctx.lineTo(x, y); // end point of line
          ctx.strokeStyle = "black";
        }
      
        ctx.stroke();
        var image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let array = this.state.undoImage;
        array.push(image);
        this.setState({ undoImage: array });
      }
    );

    // this.setState({ undoImage: array });
  }
  // handleMouseMove(event){

  // }
  handleMouseUp(event) {
    this.setState({
      isDown: false,
      currentX: event.offsetX,
      currentY: event.offsetY,
    });
    //if(this.state.isDown){
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    var x = event.offsetX;
    var y = event.offsetY;
    var ctx = canvas.getContext("2d");
    if (this.props.solution.coilSpringApplied) {
      ctx.moveTo(this.state.previousPointX, this.state.previousPointY);
      ctx.lineTo(x, y);
      ctx.stroke();    
      // ctx.closePath();
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.lineWidth = 2
      ctx.arc(this.state.previousPointX, this.state.previousPointY, 10,0, 2 * Math.PI, false);
      ctx.arc(x, y,10, 0, 2 * Math.PI, false);
      // ctx.setLineDash([1, 2])
      // ctx.beginPath();
      // ctx.setLineDash([])
     
    }else{
    
      ctx.moveTo(this.state.previousPointX, this.state.previousPointY);
      ctx.lineTo(x, y);
    }
   
    ctx.stroke();    
    ctx.closePath();

    // calling log function here
    this.fromTooth();
    this.toTooth();
    //}
  }
  save() {
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    // below line will download image
    // window.location.href=image;
    // this.setState({ image: image });
    {
      this.props.saveCanvas(image); // canvas image is saved here
    }
  }

  undo() {
    let undoImage = this.state.undoImage;
    undoImage.pop();
    this.setState({ image: undoImage[undoImage.length - 1] });
    // this.props.toggle(undoImage[undoImage.length - 1])
  }

  reset() {
    let image = "";
    // this.props.toggle(image)
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1040, 105);
  }

  cancel(){
    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1040, 105);
    this.props.cancel()
  }

  componentDidMount() {
  //   const canvas = ReactDOM.findDOMNode(this.refs.canvas);
  //   const ctx = canvas.getContext("2d");

  // //   // color of the canvas
  // //   // plain Canvas without image inserted
  // //   var image = new Image();
  // //   ctx.drawImage(image, 0, 0);
  // //   ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
  // //   ctx.fillRect(0, 0, 1040, 105);

  // //   // with image
  //   var image = new Image();
  //   // if image throws error
  //   image.crossOrigin = "Anonymous";
  //   // image.src ="https://thumbs.dreamstime.com/b/mockup-iphone-screen-background-have-png-isolated-various-applications-158473491.jpg"
  // image.src=this.props.solution.canvasImage;
  //     image.onload = function () {
  //     //draw background image
  //     ctx.drawImage(image, 0, 0);
  //     //draw a box over the top
  //     ctx.fillStyle = "rgba(0, 0, 0, 0)";
  //     ctx.fillRect(0, 0, 1040, 105);

  //   };
  }

  componentDidUpdate(prevState, prevProps) {

    const canvas = ReactDOM.findDOMNode(this.refs.canvas);
    const ctx = canvas.getContext("2d");
    var image = new Image();
    // ctx.globalAlpha = 0.7  
    ctx.fillStyle = 'transparent';
    image.onload = function () {
      //draw background image
      // image.src = this.props.solution.canvasImage;
      // image.src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/minus-512.png"

      ctx.drawImage(image, 0, 0);
      //draw a box over the top
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, 1040, 105);

      // console.log("object",this.props.log)  

      // image.src ="https://thumbs.dreamstime.com/b/mockup-iphone-screen-background-have-png-isolated-various-applications-158473491.jpg"
    };
    // console.log("object",this.props.solution)
    // console.log("refs",)
  }

  render() {

    const buttonStyle = {
      color: "white",    
      marginTop:"91px",
      marginBottom: "0",
      marginLeft: "450px",
      marginRight: "auto",
      zIndex:'1',
    };


    const buttons = () => {
      if (
        this.props.solution.rubberBandApplied ||
        this.props.solution.coilSpringApplied
      ) {
        return (
          <div style={buttonStyle}>
            <button className="btn btn-success btn-sm"  onClick={this.save}>save</button>
            <button className="btn btn-warning btn-sm" onClick={this.reset}>reset</button>
            <button className="btn btn-danger btn-sm" onClick={this.cancel}>cancel</button>
          </div>
        );
      }
    };

    return (
      <div>
        <canvas
          id="canvas"
          ref="canvas"
          width={1040}
          height={105}
          style={{border:"1px solid red"}}
          onMouseDown={(e) => {
            let nativeEvent = e.nativeEvent;
            this.handleMouseDown(nativeEvent);
          }}
          // onMouseMove={
          //     e => {
          //         let nativeEvent = e.nativeEvent;
          //         this.handleMouseMove(nativeEvent);
          //     }}
          onMouseUp={(e) => {
            let nativeEvent = e.nativeEvent;
            this.handleMouseUp(nativeEvent);
          }}
        />
       
        {buttons()}
        {/* <div>
            <button onClick={this.save}>save</button>
            <button onClick={this.reset}>reset</button>
            <button onClick={this.props.cancel}>cancel</button>
        </div> */}
       
        
        
      </div>
    );
  }
}
