import React, { useState, useEffect } from "react";
import "./Chart.css";
import CSS from "csstype";

//  button icons
import pencilIcon from '../images/Icons/pencilIcon.png'
import cavityIcon from "../images/Icons/cavityIcon.png";
import chainIcon from "../images/Icons/chainIcon.png";
import implantIcon from "../images/Icons/implantIcon.png";
import rubberBandIcon from "../images/Icons/rubberBandIcon.png";
import wireIcon from "../images/Icons/wireIcon.jpg"; //wire icon
import coiledSpringIcon from "../images/Icons/springIcon.png"; // spring coil
import bracketIcon from "../images/Icons/bracketIcon.jpeg";
import closeIcon from '../images/Icons/closeIcon.png'
import okIcon from   '../images/Icons/okIcon.png'

type MyProps = {
  log: any;
  deleteLog: (argument: string, argument2: string) => void;
  deleteRange: (argument: string, argument2: string) => void;
  editRemarks:(argument: string, argument2: string) => void;
};

type selectedType = {
  [k: string]: boolean;
};

function LogTable({ log, deleteLog, deleteRange,editRemarks }: MyProps) {
  const [logComment, setLogComment] = useState<any>([]);
  // const [editView, setEditView] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [saveChanges,setSaveChanges]=useState(false)

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
    setRemarks("")
    setSelected({ ...selected, [e.target.alt]: !selected[e.target.alt] });
  }

//   function logTableModal(logName:string,functionName:string){
//       if(){

//       }else if(){

//       }else if(){

//       }else if (){}
//   }

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
    height: "30px",
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
          {log.rubberBandComment !== null ? log.rubberBandComment + "-" : ""}
          {log.coiledSpringComment !== null
            ? log.coiledSpringComment + "-"
            : ""}
        </td>
        <td className="d-flex justify-content-center">
          {/* <div className="log-table-remarks"> */}
            {selected[log.name] ? (
              <>
                <input className="form-control" 
                onChange={handleOnChange}
                value={log.remarks}
                />
                {/* remarks close button */}
               
               <input
              type="image"           
              onClick={handleRemarksSubmit}
              src={okIcon}
              style={deleteButton}
              alt={log.name}
            />
              </>
            ) : (
              <>
             {/* remarks edit button */}   
             <h6> {log.remarks}</h6>
         <input
              type="image"           
              onClick={handleClickInput}
              src={pencilIcon}
              style={deleteButton}
              alt={log.name}
            />
           
            <input
              type="image"           
              // onClick={handleRemarksSubmit}
              src={closeIcon}
              style={deleteButton}
              alt={log.name}
            />
             </> 
            )}
          {/* </div> */}
        </td>
        <td>
          {/* implant and cavity */}
          {log.log !== null ? (
            <input
            type="image"           
            onClick={() => deleteLog(log.name, "cavity")}
            src={cavityIcon}
            style={deleteButton}
          />  
              // Delete
         
          ) : (
            ""
          )}

          {log.wireStartsHere ? (
            <input
              type="image"
             
              onClick={() => deleteLog(log.name, "wire")}
              src={wireIcon}
              style={deleteButton}
            />             
          ) : (
            ""
          )}
          {log.chainStartsHere ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={chainIcon}
              style={deleteButton}
              // onClick={() => deleteRange(log.name,"chain")}
              onClick={() => deleteLog(log.name, "chain")}
            />
              // DeleteChain         
          ) : (
            ""
          )}
          {log.bracketStartsHere ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={bracketIcon}
              style={deleteButton}
              onClick={() => deleteLog(log.name, "bracket")}
            />
              // DeleteBracket
           
          ) : (
            ""
          )}
          {log.rubberBand ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={rubberBandIcon}
              style={deleteButton}
              onClick={() => deleteRange(log.name, "rubberBand")}
            />
              // DeleteRubberBand
           
          ) : (
            ""
          )}
          {log.coiledSpring ? (
            <input
              type="image"
              // className="btn btn-outline-danger"
              src={coiledSpringIcon}
               style={deleteButton}
              onClick={() => deleteRange(log.name, "coiledSpring")}
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
    </div>
  );
}

export default LogTable;

type LogRowsProps = {
  logComment: any;
};

const LogRows = (props: any) => {
  const { log } = props.log;
  // const { key } = props.key;

  return (
    <tr key={props.key}>
      <th scope="row">{props.key + 1}</th>
      <td>{log.date}</td>
      <td>
        {log.name + "-"}
        {log.log !== null ? log.log + "-" : ""}
        {log.wireRangeComment !== null ? log.wireRangeComment + "-" : ""}
        {log.chainRangeComment !== null ? log.chainRangeComment + "-" : ""}
        {log.bracketRangeComment !== null ? log.bracketRangeComment + "-" : ""}
        {log.rubberBandComment !== null ? log.rubberBandComment + "-" : ""}
        {log.coiledSpringComment !== null ? log.coiledSpringComment + "-" : ""}
      </td>
      <td>
        {log.log !== null ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => props.deleteLog(log.name, "cavity")}
          >
            Delete
          </button>
        ) : (
          ""
        )}

        {log.wireStartsHere ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            // style={hidden}
            onClick={() => props.deleteLog(log.name, "wire")}
          >
            DeleteWire
          </button>
        ) : (
          ""
        )}
        {log.chainStartsHere ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            // style={hidden}
            // onClick={() => deleteRange(log.name,"chain")}
            onClick={() => props.deleteLog(log.name, "chain")}
          >
            DeleteChain
          </button>
        ) : (
          ""
        )}
        {log.bracketStartsHere ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            // style={hidden}
            onClick={() => props.deleteLog(log.name, "bracket")}
          >
            DeleteBracket
          </button>
        ) : (
          ""
        )}
        {log.rubberBand ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            // style={hidden}
            onClick={() => props.deleteRange(log.name, "rubberBand")}
          >
            DeleteRubberBand
          </button>
        ) : (
          ""
        )}
        {log.coiledSpring ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            // style={hidden}
            onClick={() => props.deleteRange(log.name, "coiledSpring")}
          >
            DeleteCoiledSpring
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
    
  );
};
