import React, { useState, useEffect } from "react";
import "./Chart.css";
import CSS from "csstype";

//  button icons
// import pencilIcon from '../images/Icons/pencilIcon.png'
// import cavityIcon from "../images/Icons/cavityIcon.png";
// import chainIcon from "../images/Icons/chainIcon.png";
// import implantIcon from "../images/Icons/implantIcon.png";
// import rubberBandIcon from "../images/Icons/rubberBandIcon.png";
// import wireIcon from "../images/Icons/wireIcon.jpg"; //wire icon
// import coiledSpringIcon from "../images/Icons/springIcon.png"; // spring coil
// import bracketIcon from "../images/Icons/bracketIcon.jpeg";
// import closeIcon from '../images/Icons/closeIcon.png'
// import okIcon from   '../images/Icons/okIcon.png'

type MyProps = {
  log: any;
  deleteLog: (argument: string, argument2: string) => void;
  deleteRange: (argument: string, argument2: string) => void;
  editRemarks:(argument: string, argument2: string) => void;
  deleteRemarks:(logName:string)=>void;
  image:any;
};

type selectedType = {
  [k: string]: boolean;
};

function LogTable({ log, deleteLog, deleteRange,editRemarks,deleteRemarks,image }: MyProps) {
  const [logComment, setLogComment] = useState<any>([]);
  // const [editView, setEditView] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [saveChanges,setSaveChanges]=useState(false)
  const [state,setState]=useState({
    logName:"",
    functionName:"",
  })

  const initialSelected: selectedType = {
    tooth18: false,
    tooth17: false,
    tooth16: false,
    tooth15: false,
    tooth14: false,
    tooth13: false,
    tooth12: false,
    tooth11: false,
    tooth21: false,
    tooth22: false,
    tooth23: false,
    tooth24: false,
    tooth25: false,
    tooth26: false,
    tooth27: false,
    tooth28: false,
    tooth31: false,
    tooth32: false,
    tooth33: false,
    tooth34: false,
    tooth35: false,
    tooth36: false,
    tooth37: false,
    tooth38: false,
    tooth48: false,
    tooth47: false,
    tooth46: false,
    tooth45: false,
    tooth44: false,
    tooth43: false,
    tooth42: false,
    tooth41: false,
  };

  const [selected, setSelected] = useState(initialSelected);

  function handleClickInput(e: any) {
    let altValue = e.target.alt;
    setSelected({ ...selected, [altValue]: !selected[altValue] });
  }

  function handleOnChange(e:any){
     setRemarks(e.target.value)    
  }

  function handleRemarksSubmit(e:any){
    editRemarks(e.target.alt,remarks)    
    setSelected({ ...selected, [e.target.alt]: !selected[e.target.alt] });
    setRemarks("")
  }

  

  function handleDeleteIcon(logName:string,functionName:string){
    setState({...state,logName,functionName})
    setSaveChanges(!saveChanges)
  }

 
  function logTableModal(){
      if(state.functionName==="cavity"){
        deleteLog(state.logName, "cavity")
      }else if(state.functionName==="wire"){
        deleteLog(state.logName, "wire")
      }else if(state.functionName==="bracket"){
        deleteLog(state.logName, "bracket")
      }else if (state.functionName==="implant"){
        deleteLog(state.logName, "implant")
      }
      // range delete for rubberBand and coiledSpring
      else if (state.functionName=== "rubberBand"){
        deleteRange(state.logName, "rubberBand")
      }else if(state.functionName==="coiledSpring"){
        deleteRange(state.logName, "coiledSpring")
      }else if(state.functionName=== "chain"){
        deleteLog(state.logName, "chain")
      }
      setState({...state,
        logName:"",
        functionName:""
      })
      setSaveChanges(!saveChanges)
  }

  // css style
  const tableHeaderStyle = {
    position: "sticky",
    top: "0",
  };

  const hidden: CSS.Properties = {
    visibility: "hidden",
  };

  const deleteButton:CSS.Properties={
    width: "auto",
    height: "35px",
  }

  
  const remarksButton:CSS.Properties={
    width: "auto",
    height: "26px",
  }

  const remarksHeading:CSS.Properties={    
    // marginLeft:"auto",
    // marginRight:"auto",
    marginTop:"1%",
    marginBottom:"1%",
  }

  let cleanData: any = [];

  const clean = () => {
    let previousState = [...log.logs];

    for (let i = 0; i < previousState.length; i++) {
      if (
        previousState[i].log !== null ||
        previousState[i].wireStartsHere ||
        previousState[i].chainStartsHere ||
        previousState[i].bracketStartsHere ||
        previousState[i].rubberBand ||
        previousState[i].coiledSpring
      ) {
        cleanData.push(previousState[i]);
      }
      setLogComment(cleanData);
    }
  };

  // function handleChange(evt:any) {
  //   const value = evt.target.value;
  //   setFunctionSelect({
  //     ...functionSelect,
  //     [evt.target.name]: value,
  //   });
  // }

  useEffect(() => {
    clean();
   
  }, [log]);

  

  const logDisplay = logComment.map((log: any, i: any) => {
    return (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{log.date}</td>
        <td>
          {log.name + "-"}
          {log.log !== null ? log.log + "-" : ""}
          {log.wireRangeComment !== null ? log.wireRangeComment + "-" : ""}
          {log.chainRangeComment !== null ? log.chainRangeComment + "-" : ""}
          {log.bracketRangeComment !== null
            ? log.bracketRangeComment + "-"
            : ""}
          {log.rubberBand ? log.rubberBandComment + "-" : ""}
          {log.coiledSpring
            ? log.coiledSpringComment + "-"
            : ""}
        </td>
        <td className="d-flex justify-content-center">
          {/* <div className="log-table-remarks"> */}
            {selected[log.name] ? (
              <>
                <input className="form-control h-25 w-25" 
                type="text"
                onChange={handleOnChange}
                // value={log.remarks}
                />
                {/* remarks save button  tickIcon*/}               
               <input
              type="image"           
              onClick={handleRemarksSubmit}
              src={image["icons"][8]["path"]}
              style={remarksButton}
              alt={log.name}
            />
            {/* close icon */}
             <input
              type="image"           
              onClick={handleClickInput}
              src={image["icons"][9]["path"]}
              style={remarksButton}
              alt={log.name}
            />
              </>
             ) : (
              <>
             {/* remarks edit button pencilIcon */}   
             <h6 style={remarksHeading}> {log.remarks}</h6>
         <input
              type="image"           
              onClick={handleClickInput}
              src={image["icons"][10]["path"]}
              style={ remarksButton}
              alt={log.name}
            />
            {/* delete button x icon */}
            <input
              type="image"           
              onClick={()=>deleteRemarks(log.name)}
              src={image["icons"][9]["path"]}
              style={remarksButton}
              alt={log.name}
            />  
             </> 
           )}
         
        </td>
        <td>
          {/* implant  */}
          {log.implant ? (
            <input
            type="image"           
            onClick={() => handleDeleteIcon(log.name, "implant")}
            src={image["icons"][1]["path"]}
            style={deleteButton}
          />  
              // Delete
         
          ) : (
            ""
          )}
           {/*  cavity */}
           {log.cavity  ? (
            <input
            type="image"           
            // onClick={() => deleteLog(log.name, "cavity")}
            onClick={()=>handleDeleteIcon(log.name,"cavity")}
            src={image["icons"][0]["path"]}
            style={deleteButton}
          />  
              // Delete         
          ) : (
            ""
          )}

          {log.wireStartsHere ? (
            <input
              type="image"             
              onClick={() => handleDeleteIcon(log.name, "wire")}
              src={image["icons"][7]["path"]}
              style={deleteButton}
            />             
          ) : (
            ""
          )}
          {log.chainStartsHere ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={image["icons"][3]["path"]}
              style={deleteButton}
              // onClick={() => deleteRange(log.name,"chain")}
              onClick={() => handleDeleteIcon(log.name, "chain")}
            />
              // DeleteChain         
          ) : (
            ""
          )}
          {log.bracketStartsHere ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={image["icons"][2]["path"]}
              style={deleteButton}
              onClick={() => handleDeleteIcon(log.name, "bracket")}
            />
              // DeleteBracket
           
          ) : (
            ""
          )}
          {log.rubberBand ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={image["icons"][5]["path"]}
              style={deleteButton}
              onClick={() =>  handleDeleteIcon(log.name, "rubberBand")}
            />
              // DeleteRubberBand
           
          ) : (
            ""
          )}
          {log.coiledSpring ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={image["icons"][6]["path"]}
               style={deleteButton}
              onClick={() => handleDeleteIcon(log.name, "coiledSpring")}
            />
              // DeleteCoiledSpring
          
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="vertical-scroll-log-table">
      <table className="table table-hover log-table ">
        <thead>
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Remarks</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logDisplay}
          {/* {logComment.map((log: any, i: number) => (
            <LogRows
              key={i}
              log={log}
              deleteLog={deleteLog}
              deleteRange={deleteRange}
            />
          ))} */}
        </tbody>
      </table>
    {saveChanges?<div className="modal-log-table display-block " id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog  modal-sm " role="document">
    <div className="modal-content border border-dark rounded">
      <div className="modal-header border ">
        {/* <h5 className="modal-title" id="exampleModalLabel">Delete </h5>
        <button type="button" className="close" data-dismiss="modal" onClick={()=>setSaveChanges(!saveChanges)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div className="modal-body">
      Delete {state.functionName}
      </div>
      <div className="modal-footer  justify-content-center">
      <button type="button" className="btn btn-secondary"  onClick={()=>setSaveChanges(!saveChanges)} data-dismiss="modal">Cancel</button>
      <button type="button" className="btn btn-danger" onClick={logTableModal}>Delete</button>
      </div>
    </div>
  </div>
</div>:""}  
    </div>
    
  );
}

export default LogTable;


