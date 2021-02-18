import React, { useState, useEffect } from "react";
import './LogTable.css'

function LogTable({ log, deleteLog, editLog, deleteRange }) {
  const [logComment, setLogComment] = useState([]);
  // const [editView, setEditView] = useState(false);
  const [functionSelect, setFunctionSelect] = useState("");

  // css style 
  const tableHeaderStyle={
    position: 'sticky',
        top: '0',
  }

  let cleanData = [];

  const clean = () => {
    let previousState =[...log.logs];

    for (let i = 0; i < previousState.length; i++) {
      if (
        previousState[i].log !== null ||
        previousState[i].wireStartsHere ||
        previousState[i].chainStartsHere ||
        previousState[i].bracketStartsHere||
        previousState[i].rubberBand||
        previousState[i].coiledSpring
      ) {
        cleanData.push(previousState[i]);
      }
      setLogComment(cleanData);
    }
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setFunctionSelect({
      ...functionSelect,
      [evt.target.name]: value,
    });
  }

 

  useEffect(() => {
    clean();
    // console.log(functionSelect);
  }, [log]);

  const logDisplay = logComment.map((log, i) => {
    return (
      <tr key={i}>
        <th scope="row">{i+1}</th>
        <td>{log.date}</td>
        <td>
          {log.name+"-"}
          {log.log!==null? log.log+"-":""}     
          {log.wireRangeComment!==null ? log.wireRangeComment+"-" : ""}
          {log.chainRangeComment!==null ? log.chainRangeComment+"-" : ""}
          {log.bracketRangeComment!==null ? log.bracketRangeComment+"-" : ""}
          {log.rubberBandComment!==null?log.rubberBandComment+"-":""}
          {log.coiledSpringComment!==null?log.coiledSpringComment+"-":""}
        </td>
        <td>
          {log.log!==null?<button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => deleteLog(log.name,"cavity")}
          >
            Delete
          </button>:""}
          
          {log.wireStartsHere ? (
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ visibility: "hidden;" }}
              onClick={() => deleteLog(log.name,"wire")}
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
              style={{ visibility: "hidden;" }}
              // onClick={() => deleteRange(log.name,"chain")}
              onClick={() => deleteLog(log.name,"chain")}
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
              style={{ visibility: "hidden;" }}
              onClick={() => deleteLog(log.name,"bracket")}
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
              style={{ visibility: "hidden;" }}
              onClick={() => deleteRange(log.name,"rubberBand")}
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
              style={{ visibility: "hidden;" }}
              onClick={() => deleteRange(log.name,"coiledSpring")}
            >
              DeleteCoiledSpring
            </button>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="vertical-scroll-log-table">     
      <table class="table table-hover log-table " >      
        <thead >          
          <tr>
            <th scope="col">Sno</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>       
        </thead>       
        <tbody>{logDisplay}</tbody>
      </table>
    </div>
  );
}

export default LogTable1;
