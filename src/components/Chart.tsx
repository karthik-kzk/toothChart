import React, { useState, useEffect } from "react";
import "./Chart.css";

// button icons for wire and brackets
// import wireButtonIcon from "../images/Icons/wireIcon.png";
import Loading from "../images1/Loading.gif";

//component imported  here
import Canvas from "./Canvas";
import LogTable from "./LogTable";
// import SelectBox from "./SelectBox-Old";
// import SelectBoxClass from "./SelectBoxClass";

// importing log data
// import { logs, teethImage } from "./ChartData";

const axios = require("axios");

type selectedType = {
  [k: string]: boolean;
};

function Chart() {
  const toothStyle = {
    display: "block",
    maxWidth: "60px",
    maxHeight: "120px",
    width: "auto",
    height: "120px",
    margin: "auto",
    // horizontalAlign:"middle",
  };

  const lineStyle = {
    // display: "block",
    minWidth: "30px",
    maxHeight: "20px",
    width: "auto",
    height: "20px",
  };

  const bracketStyle = {
    // display: "block",
    // minWidth: "30px",
    // maxHeight: "20px",
    width: "30px",
    height: "20px",
  };

  const lowerBracketStyle = {
    height: "20px",
    width: "auto",
  };

  const lowerWireStyle = {
    width: "30px",
    height: "20px",
  };

  const chainStyle = {
    display: "block",
    minWidth: "5px",
    maxHeight: "15px",
    // width: "auto",
    // height: "120px",
  };

  const buttonStyle = {
    display: "block",
    maxWidth: "60px",
    maxHeight: "80px",
    width: "auto",
    height: "auto",
  };
  // api call state
  const [log, setLog] = useState<any>({
    logs: [],
  });

  const [image, setImage] = useState<any>([]);

  // local state for testing
  // const [log, setLog] = useState({
  //   logs,
  // });

  // const teeth = { ...teethImage };

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

  const initialSolution = {
    coilSpringApplied: false,
    wireApplied: false,
    bracketApplied: false,
    chainApplied: false,
    rubberBandApplied: false,
    canvasImage: "",
    date: "",
    typeValue: "",
  };

  const [enableCanvas, setEnableCanvas] = useState(false);

  const [selected, setSelected] = useState(initialSelected);

  const [enableSelectBox, setEnableSelectBox] = useState(false);

  const [showBracketType, setShowBracketType] = useState(false);

  const [showChainType, setShowChainType] = useState(false);

  // solution applied to teeth like wire ,coil, bracket
  const [solution, setSolution] = useState(initialSolution);

  const [isLoading, setIsLoading] = useState(true);

  // date
  let today = new Date();
  let date =
    today.getDate() +
    "-" +
    // parseInt(today.getMonth() + 1) +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  function handleClickTeeth(e: any) {
    let altValue = e.target.alt;
    setSelected({ ...selected, [altValue]: !selected[altValue] });
  }

  function cavityFunction() {
    let logComment: any = [...log.logs];
    for (var i in selected) {
      if (selected[i]) {
        const elementIndex = logComment.findIndex((e: any) => e.name === i);

        logComment[elementIndex] = {
          ...logComment[elementIndex],
          value: 1,
          cavity: true,
          log: "cavity",
          date: date,
          implant: false,
        };
      }
    }
    setLog({ logs: logComment });
    setSelected(initialSelected);
  }

  function implantFunction() {
    let logComment: any = [...log.logs];
    for (var i in selected) {
      if (selected[i]) {
        const elementIndex = logComment.findIndex((e: any) => e.name === i);

        logComment[elementIndex] = {
          ...logComment[elementIndex],
          value: 2,
          implant: true,
          log: "implant",
          date: date,
          cavity: false,
        };
      }
    }

    setLog({ logs: logComment });
    setSelected(initialSelected);
  }

  // coilSpringApplied: 0,
  //   wireApplied: false,
  //   bracketApplied: 0,
  //   chainApplied:0,
  //   rubberBandApplied:0,
  //   chainApplied:0,

  function bracketFunction(e: any) {
    // setEnableSelectBox(!enableSelectBox);
    setSolution({
      ...solution,
      bracketApplied: true,
      chainApplied: false,
      wireApplied: false,
      typeValue: e.target.alt,
    });
    setShowBracketType(!showBracketType);
    let logComment: any = [...log.logs];
    for (var i in selected) {
      if (selected[i]) {
        const elementIndex = logComment.findIndex((e: any) => e.name === i);
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          bracket: true,
          bracketStartsHere: true,
          bracketRangeComment: `bracket`,
          bracketIconValue: e.target.alt,
          date: date,
        };
      }
    }
    setLog({ logs: logComment });
    setSelected(initialSelected);
  }

  function chainFunction(e: any) {
    // setEnableSelectBox(!enableSelectBox);
    setSolution({
      ...solution,
      bracketApplied: false,
      chainApplied: true,
      wireApplied: false,
      typeValue: e.target.alt,
    });
    setShowChainType(!showChainType);
    let logComment: any = [...log.logs];
    for (var i in selected) {
      if (selected[i]) {
        const elementIndex = logComment.findIndex((e: any) => e.name === i);
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          chain: true,
          chainStartsHere: true,
          chainRangeComment: `chain`,
          chainIconValue: e.target.alt,
          date: date,
        };
      }
    }
    setLog({ logs: logComment });
    setSelected(initialSelected);
  }

  function wireFunction() {
    // setEnableSelectBox(true);
    setSolution({
      ...solution,
      coilSpringApplied: false,
      wireApplied: true,
      bracketApplied: false,
      chainApplied: false,
      rubberBandApplied: false,
      canvasImage: "",
      date: "",
      typeValue: "",
    });
    let logComment: any = [...log.logs];
    for (var i in selected) {
      if (selected[i]) {
        const elementIndex = logComment.findIndex((e: any) => e.name === i);
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          wire: true,
          wireRangeComment: `wire`,
          wireStartsHere: true,
          date: date,
        };
      }
    }
    setLog({ logs: logComment });
    setSelected(initialSelected);
  }

  function rubberBandFunction() {
    setEnableCanvas(true);
    setSolution({
      ...solution,
      coilSpringApplied: false,
      wireApplied: false,
      bracketApplied: false,
      chainApplied: false,
      rubberBandApplied: true,
      canvasImage: "",
      date: "",
      typeValue: "",
    });
  }

  function coiledSpringFunction() {
    setEnableCanvas(true);
    // alert("hello")
    setSolution({
      ...solution,
      coilSpringApplied: true,
      wireApplied: false,
      bracketApplied: false,
      chainApplied: false,
      rubberBandApplied: false,
      canvasImage: "",
      date: "",
      typeValue: "",
    });
  }

  function saveCanvasImage(image: string) {
    let logComment: any = [...log.logs];

    if (solution.rubberBandApplied) {
      console.log("🚀 ~ file: Chart.tsx ~ line 333 ~ saveCanvasImage ~ image");
      for (var i in selected) {
        if (selected[i]) {
          const elementIndex = logComment.findIndex((e: any) => e.name === i);
          logComment[elementIndex] = {
            ...logComment[elementIndex],
            rubberBand: true,
            rubberBandComment: "rubberBand",
            canvasImage: image,
            date: date,
          };
        }
      }
    } else {
      for (var i in selected) {
        if (selected[i]) {
          const elementIndex = logComment.findIndex((e: any) => e.name === i);
          logComment[elementIndex] = {
            ...logComment[elementIndex],
            coiledSpring: true,
            canvasImage: image,
            coiledSpringComment: "coiledSpring",
            date: date,
          };
        }
      }
    }
    setLog({ logs: logComment });
    setSelected(initialSelected);
    setEnableCanvas(!enableCanvas);
    setSolution({
      ...solution,
      coilSpringApplied: false,
      wireApplied: false,
      bracketApplied: false,
      chainApplied: false,
      rubberBandApplied: false,
      date: "",
      typeValue: "",
    });
  }

  function deleteRange(logName: string, deleteSolution: string) {
    let logComment: any = [...log.logs];
    //  for remarks comparison if last function delete remarks
    let keys = [
      "bracket",
      "wire",
      "chain",
      "coiledSpring",
      "rubberBand",
      "cavity",
      "implant",
    ];
    // to get the  range of  array
    // getting start value
    let startIndex = logComment.findIndex((e: any) => e.name == logName);
    let array: string[] = [];

    if (deleteSolution === "wire") {
      // getting array for slice
      array = logComment[startIndex].wireRangeArray;
      for (let i = 0; i < array.length; i++) {
        if (array !== undefined) {
          const elementIndex = logComment.findIndex(
            (e: any) => e.name == array[i]
          );
          logComment[elementIndex] = {
            ...logComment[elementIndex],
            wire: false,
            wireStartsHere: false,
            wireRangeComment: null,
            wireRangeEndToothName: null,
            wireRangeArray: [],
          };
        }
      }
      setLog({ logs: logComment });
    } else if (deleteSolution === "chain") {
      // getting array for slice
      array = logComment[startIndex].chainRangeArray;
      for (let i = 0; i < array.length; i++) {
        if (array !== undefined) {
          const elementIndex = logComment.findIndex(
            (e: any) => e.name == array[i]
          );
          logComment[elementIndex] = {
            ...logComment[elementIndex],
            chain: false,
            chainStartsHere: false,
            chainRangeComment: "",
            chainRangeEndToothName: "",
            chainRangeArray: [],
            chainIconValue: 0,
          };
        }
      }
      setLog({ logs: logComment });
    } else if (deleteSolution === "bracket") {
      // getting array for slice
      array = logComment[startIndex].bracketRangeArray;
      for (let i = 0; i < array.length; i++) {
        if (array !== undefined) {
          const elementIndex = logComment.findIndex(
            (e: any) => e.name == array[i]
          );
          logComment[elementIndex] = {
            ...logComment[elementIndex],
            bracket: false,
            bracketStartsHere: false,
            bracketRangeComment: "",
            bracketRangeArray: [],
            bracketIconValue: 0,
            bracketRangeEndToothName: "",
          };
        }
      }
      setLog({ logs: logComment });
    } else if (deleteSolution === "rubberBand") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        rubberBand: false,
        canvasImage: "",
        rubberBandComment: "",
      };
      setLog({ logs: logComment });
    } else if (deleteSolution === "coiledSpring") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        // rubberBand: false,
        coiledSpring: false,
        canvasImage: "",
        coiledSpringComment: "",
      };
      setLog({ logs: logComment });
    } else {
      return logComment;
    }
  }

  // // cancel canvas
  function cancelCanvas() {
    setEnableCanvas(!enableCanvas);
    setSolution({
      ...solution,
      rubberBandApplied: false,
      coilSpringApplied: false,
    });
  }

  function deleteLog(logName: string, deleteSolution: string) {
    let logComment: any = [...log.logs];
    //  for remarks comparison if last function delete remarks
    let keys = [
      "bracket",
      "wire",
      "chain",
      "coiledSpring",
      "rubberBand",
      "cavity",
      "implant",
    ];
    if (deleteSolution === "wire") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        wire: false,
        wireRangeComment: null,
        wireStartsHere: false,
      };
    } else if (deleteSolution === "chain") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        chain: false,
        chainStartsHere: false,
        chainRangeComment: null,
      };
    } else if (deleteSolution === "bracket") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        bracket: false,
        bracketStartsHere: false,
        bracketRangeComment: null,
      };
    } else if (deleteSolution === "cavity") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        value: 0,
        log: null,
        implant: false,
        cavity: false,
      };
    } else if (deleteSolution === "implant") {
      const elementIndex = logComment.findIndex((e: any) => e.name == logName);
      let test = logComment[elementIndex];
      let filtered = keys.filter(function (key) {
        return test[key];
      });
      if (filtered.length === 1) {
        logComment[elementIndex] = {
          ...logComment[elementIndex],
          remarks: null,
        };
      }
      logComment[elementIndex] = {
        ...logComment[elementIndex],
        value: 0,
        log: null,
        implant: false,
        cavity: false,
      };
    }
    setLog({ logs: logComment });
  }

  function disableLoadingScreen() {
    setTimeout(function () {
      setIsLoading(false);
    }, 5000);
  }

  // // applying solution to selected range bracket chain
  // function getRange(array, fromName, toName, typeValue) {
  //   let rangeComment = "  :" + ` ${fromName}` + " to" + ` ${toName}`;
  //   if (solution.bracketApplied) {
  //     if (solution.typeValue !== "") {
  //       if (array.length !== 0) {
  //         setEnableSelectBox(!enableSelectBox);
  //         let logComment = [...log.logs];
  //         for (let i = 0; i < array.length; i++) {
  //           // selecting first element to display range log value
  //           if (i === 0) {
  //             const elementIndex = logComment.findIndex(
  //               (e) => e.name == array[i]
  //             );
  //             // checking if log is empty for first tooth
  //             logComment[elementIndex] = {
  //               ...logComment[elementIndex],
  //               // log: "bracket applied from here",
  //               bracket: true,
  //               bracketStartsHere: true,
  //               bracketRangeComment: "bracket" + rangeComment,
  //               bracketRangeArray: array,
  //               bracketIconValue: solution.typeValue,
  //               date: date,
  //             };
  //           } else if (i === array.length - 1) {
  //             // selecting last element to display range log value
  //             const elementIndex = logComment.findIndex(
  //               (e) => e.name == array[i]
  //             );
  //             // checking if log is empty for last tooth
  //             logComment[elementIndex] = {
  //               ...logComment[elementIndex],
  //               // log: "wire ends here",
  //               bracket: true,
  //               bracketStopsHere: true,
  //               bracketIconValue: solution.typeValue,
  //               date: date,
  //             };
  //           } else {
  //             const elementIndex = logComment.findIndex(
  //               (e) => e.name == array[i]
  //             );
  //             logComment[elementIndex] = {
  //               ...logComment[elementIndex],
  //               bracket: true,
  //               bracketIconValue: solution.typeValue,
  //               date: date,
  //             };
  //           }
  //         }
  //         setLog({ logs: logComment });
  //         setSolution(initialSolution);
  //       }
  //     }
  //   } else if (solution.wireApplied) {
  //     if (array.length !== 0) {
  //       setEnableSelectBox(!enableSelectBox);
  //       let logComment = [...log.logs];
  //       for (let i = 0; i < array.length; i++) {
  //         // selecting first element to display range log value
  //         if (i === 0) {
  //           const elementIndex = logComment.findIndex(
  //             (e) => e.name == array[i]
  //           );
  //           // checking if log is empty for first tooth
  //           logComment[elementIndex] = {
  //             ...logComment[elementIndex],
  //             wire: true,
  //             wireStartsHere: true,
  //             wireRangeComment: "wire" + rangeComment,
  //             rangeEndToothName: toName,
  //             wireRangeArray: array,
  //             date: date,
  //           };
  //         } else if (i === array.length - 1) {
  //           // selecting last element to display range log value
  //           const elementIndex = logComment.findIndex(
  //             (e) => e.name == array[i]
  //           );
  //           logComment[elementIndex] = {
  //             ...logComment[elementIndex],
  //             wire: false,
  //             wireStartsHere: false,
  //             wireStopsHere: true,
  //             wireRangeComment: rangeComment,
  //             date: date,
  //           };
  //         } else {
  //           const elementIndex = logComment.findIndex(
  //             (e) => e.name == array[i]
  //           );
  //           logComment[elementIndex] = {
  //             ...logComment[elementIndex],
  //             wire: true,
  //             date: date,
  //           };
  //         }
  //       }
  //       setLog({ logs: logComment });
  //       setSolution(initialSolution);
  //     }
  //   } else if (solution.chainApplied) {
  //     if (solution.typeValue !== "") {
  //       if (array.length !== 0) {
  //         setEnableSelectBox(!enableSelectBox);
  //         let logComment = [...log.logs];
  //         for (let i = 0; i < array.length; i++) {
  //           // selecting first element to display range log value
  //           if (i === 0) {
  //             const elementIndex = logComment.findIndex(
  //               (e) => e.name == array[i]
  //             );
  //             // checking if log is empty for first tooth

  //             logComment[elementIndex] = {
  //               ...logComment[elementIndex],
  //               chain: true,
  //               chainStartsHere: true,
  //               chainRangeComment: "chain" + rangeComment,
  //               chainRangeEndToothName: toName,
  //               chainRangeArray: array,
  //               chainIconValue: solution.typeValue,
  //               date: date,
  //             };
  //           } else if (i === array.length - 1) {
  //             // last chain icon will be disabled similar to wire
  //             const elementIndex = logComment.findIndex(
  //               (e) => e.name == array[i]
  //             );
  //             logComment[elementIndex] = {
  //               ...logComment[elementIndex],
  //               chain: false,
  //               chainStopsHere: true,
  //               chainIconValue: solution.typeValue,
  //               date: date,
  //             };
  //           } else {
  //             const elementIndex = logComment.findIndex(
  //               (e) => e.name == array[i]
  //             );
  //             logComment[elementIndex] = {
  //               ...logComment[elementIndex],
  //               chain: true,
  //               chainIconValue: solution.typeValue,
  //               date: date,
  //             };
  //           }
  //         }
  //         setLog({ logs: logComment });
  //         setSolution(initialSolution);
  //       }
  //     }
  //   } else if (solution.rubberBandApplied) {
  //     if (solution.canvasImage !== "") {
  //       setEnableSelectBox(!enableSelectBox);
  //       setEnableCanvas(!enableCanvas);
  //       let logComment = [...log.logs];
  //       const elementIndex = logComment.findIndex((e) => e.name == fromName);
  //       logComment[elementIndex] = {
  //         ...logComment[elementIndex],
  //         rubberBand: true,
  //         coiledSpring: false,
  //         canvasImage: solution.canvasImage,
  //         rubberBandComment: "rubberBand" + rangeComment,
  //         date: date,
  //       };
  //       setLog({ logs: logComment });
  //       setSolution(initialSolution);
  //     }
  //   } else if (solution.coilSpringApplied) {
  //     if (solution.canvasImage !== "") {
  //       setEnableSelectBox(!enableSelectBox);
  //       setEnableCanvas(!enableCanvas);
  //       let logComment = [...log.logs];
  //       const elementIndex = logComment.findIndex((e) => e.name == fromName);
  //       logComment[elementIndex] = {
  //         ...logComment[elementIndex],
  //         // rubberBand: true,
  //         coiledSpring: true,
  //         canvasImage: solution.canvasImage,
  //         coiledSpringComment: "coiledSpring" + rangeComment,
  //         date: date,
  //       };
  //       setLog({ logs: logComment });
  //       setSolution(initialSolution);
  //     }
  //   } else {
  //     console.log(log);
  //   }
  //   // checking if bracketType  is selected
  // }

  // log edit of applied functions will be made here
  function editRemarks(logName: string, comment: string) {
    let logComment = [...log.logs];
    const elementIndex = logComment.findIndex((e: any) => e.name == logName);
    logComment[elementIndex] = {
      ...logComment[elementIndex],
      remarks: comment,
    };
    setLog({ logs: logComment });
  }

  function deleteRemarks(logName: string) {
    let logComment = [...log.logs];
    const elementIndex = logComment.findIndex((e: any) => e.name == logName);
    logComment[elementIndex] = {
      ...logComment[elementIndex],
      remarks: null,
    };
    setLog({ logs: logComment });
    console.log("735 test", logName);
  }

  const upperTeeth = log.logs.slice(0, 16).map((log: any, i: number) => {
    return (
      <div className="column" key={i}>
        {/* {i===15?disableLoadingScreen():""} */}
        <div>
          <h3>{log.id}</h3>
        </div>
        <div
          className={`tooth_and_line  ${
            selected[log.name] ? "shadowChart" : " "
          }`}
        >
          <input
            type="image"
            // src={teeth[log.name][log.value]}
            src={image[log.id][log.value]["path"]}
            style={toothStyle}
            alt={`${log.name}`}
          />
          {/* wire symbol between tooth */}
          <div
            className={`wire_button  ${log.wire ? "" : "visibility_hidden"}`}
          >
            <input
              className="disable-user-select"
              type="image"
              src={image["icons"][4]["path"]}
              style={lineStyle}
              alt="tooth18"
            />
          </div>
          {/* bracket icon for tooth */}
          <div className="bracket_button ">
            {log.bracket ? (
              <input
                className="disable-user-select"
                type="image"
                // src={bracket1Icon}
                // src={teeth.bracket[log.bracketIconValue]}
                src={image["bracket"][log.bracketIconValue]["path"]}
                style={bracketStyle}
                alt="tooth18"
              />
            ) : (
              ""
            )}
          </div>
          <div className="chain_button ">
            {log.chain ? (
              <input
                className="disable-user-select"
                type="image"
                // src={teeth.chain[log.chainIconValue]}
                src={image["chain"][log.chainIconValue]["path"]}
                style={chainStyle}
                alt="tooth18"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  });

  const lowerTeeth = log.logs.slice(16, 32).map((log: any, i: number) => {
    return (
      <div className=" column" key={i}>
        <div className={` ${selected[log.name] ? "shadowChart" : " "}`}>
          <input
            type="image"
            // src={teeth[log.name][log.value]}
            src={image[log.id][log.value]["path"]}
            style={toothStyle}
            alt={`${log.name}`}
          />
          {/* lower wire symbol between tooth */}
          <div
            className={`lower_wire_button  ${
              log.wire ? "" : "visibility_hidden"
            }`}
          >
            {/* wire icon on tooth */}
            <input
              type="image"
              className="disable-user-select"
              // src={wireButtonIcon}
              src={image["icons"][4]["path"]}
              style={lowerWireStyle}
              alt="tooth18"
            />
          </div>
          {/* lower bracket icon for tooth */}
          <div className="lower_bracket_button ">
            {log.bracket ? (
              <input
                type="image"
                className="disable-user-select"
                // src={bracket1Icon}
                // src={teeth.bracket[log.bracketIconValue]}
                src={image["bracket"][log.bracketIconValue]["path"]}
                style={lowerBracketStyle}
                alt="tooth18"
              />
            ) : (
              ""
            )}
          </div>
          <div className="lower_chain_button ">
            {log.chain ? (
              <input
                type="image"
                className="disable-user-select"
                // src={bracket1Icon}
                // src={teeth.chain[log.chainIconValue]}
                src={image["chain"][log.chainIconValue]["path"]}
                style={chainStyle}
                alt="tooth18"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <h3>{log.id}</h3>
        </div>
      </div>
    );
  });

  // bracket type buttons
  const bracketTypeButtons = (
    <div>
      {image.length !== 0 ? (
        <>
          <div className="button-column button3" onClick={bracketFunction}>
            {/* Bracket type 1 */}
            <input
              type="image"
              // src={teeth.bracket[0]}
              src={image["bracket"][0]["path"]}
              style={buttonStyle}
              alt="0"
            />
          </div>
          <div className="button-column button3" onClick={bracketFunction}>
            {/* Bracket type 2 */}
            <input
              type="image"
              src={image["bracket"][1]["path"]}
              style={buttonStyle}
              alt="1"
            />
          </div>
          <div className="button-column button3" onClick={bracketFunction}>
            {/* Bracket type 3 */}
            <input
              type="image"
              src={image["bracket"][2]["path"]}
              style={buttonStyle}
              alt="2"
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );

  // chain type icons
  const chainTypeButtons = (
    <div>
      {image.length !== 0 ? (
        <>
          {" "}
          <div className="button-column button3" onClick={chainFunction}>
            {/* chain type 1 */}
            <input
              type="image"
              // src={teeth.chain[0]}
              src={image["chain"][0]["path"]}
              style={buttonStyle}
              alt="0"
            />
          </div>
          <div className="button-column button3" onClick={chainFunction}>
            {/*chain type 2 */}
            <input
              type="image"
              src={image["chain"][1]["path"]}
              style={buttonStyle}
              alt="1"
            />
          </div>
          <div className="button-column button3" onClick={chainFunction}>
            {/* chain type 3 */}
            <input
              type="image"
              src={image["chain"][2]["path"]}
              style={buttonStyle}
              alt="2"
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );

  useEffect(() => {
    axios
      // .post "http://ortho.zbapps.in/admin/api/log-update",
      .post("https://apps.minmegam.com/ortho/admin/api/log-update", {
        patient_id: "4654546446",
        logs: log.logs,
      })
      .then(function (response: any) {
        // console.log("api update response", response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [log]);

  function logApiCall() {
    axios
      .get("https://apps.minmegam.com/ortho/admin/api/log-list")
      .then(function (response: any) {
        // handle success
        setLog({ logs: response.data });
        disableLoadingScreen();

        // console.log(response.data);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }

  

  useEffect(() => {
    axios
      .get("https://apps.minmegam.com/ortho/admin/api/allteeth-imgs")
      .then(function (response: any) {
        // handle success
        setImage(response.data);
        // console.log(" 1051", response.data);
        logApiCall();

        // console.log(response.data);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
    // console.log("1059", image.length);
  }, []);

  const chart = (
    <div
      className={`teeth-plus-logTable ${isLoading ? "visibility-hidden" : ""}`}
    >
      {/* teeth is plural */}

      {image.length !== 0 ? (
        <>
          <div className="teeth-plus-button ">
            {/* <h1>Chart</h1> */}
            <div className="teeth-container " onClick={handleClickTeeth}>
              <div className="teeth-upperHalf row1">
                <div className="teeth-1st-quadrant">{upperTeeth}</div>
                <div className="teeth-2nd-quadrant "></div>
              </div>
              <div className="teeth-lowerHalf row2">
                <div className="teeth-3rd-quadrant">{lowerTeeth}</div>
              </div>
            </div>
            {/* vertical-scroll */}
            <div className="button-row vertical_scroll">
              <div className="button-column button1" onClick={cavityFunction}>
                {/* Cavity */}

                <input
                  type="image"
                  // src={teeth.icons[0]}
                  src={image["icons"][0]["path"]}
                  style={buttonStyle}
                  alt="cavityFunction"
                />
                <div className="hide">Cavity</div>
              </div>
              <div className="button-column button2" onClick={implantFunction}>
                {/* Implant */}
                <input
                  type="image"
                  // src={teeth.icons[1]}
                  src={image["icons"][1]["path"]}
                  style={buttonStyle}
                  alt="function2"
                />
                <div className="hide">Implant</div>
              </div>
              {showBracketType ? (
                bracketTypeButtons
              ) : (
                <div
                  className="button-column button3"
                  onClick={() => setShowBracketType(!showBracketType)}
                >
                  {/* Bracket */}
                  <input
                    type="image"
                    // src={teeth.icons[2]}
                    src={image["icons"][2]["path"]}
                    style={buttonStyle}
                    // alt="function3"
                  />
                  <div className="hide">Bracket</div>
                </div>
              )}
              {showChainType ? (
                chainTypeButtons
              ) : (
                <div
                  className="button-column button4"
                  onClick={() => setShowChainType(!showChainType)}
                >
                  {/* chain */}
                  <input
                    type="image"
                    // src={teeth.icons[3]}
                    src={image["icons"][3]["path"]}
                    style={buttonStyle}
                    alt="function4"
                  />
                  <div className="hide"> Chain </div>
                </div>
              )}

              <div className="button-column button5" onClick={wireFunction}>
                {/* wire */}
                <input
                  type="image"
                  // src={teeth.icons[4]}
                  src={image["icons"][7]["path"]}
                  style={buttonStyle}
                  alt="function5"
                />
                <div className="hide">Wire</div>
              </div>
              <div
                className="button-column button6"
                onClick={rubberBandFunction}
              >
                {/* RubberBand */}
                <input
                  type="image"
                  // src={teeth.icons[5]}
                  src={image["icons"][5]["path"]}
                  style={buttonStyle}
                  alt="function6"
                />
                <div className="hide">Band</div>
              </div>
              <div
                className="button-column button7"
                onClick={coiledSpringFunction}
                // style={{ backgroundColor: "rgba(0, 0, 255, 0.2)" }}
              >
                {/* coiledSpring */}
                <input
                  type="image"
                  // src={teeth.icons[6]}
                  src={image["icons"][6]["path"]}
                  style={buttonStyle}
                  alt="function7"
                />
                <div className="hide">Spring</div>
              </div>
            </div>
          </div>

          <div
            className={`canvas ${enableCanvas ? " " : " disable-user-select"}`}
          >
            <div className="canvas ">
              <div className="canvas-parent">
                {log.logs.map((log: any, i: number) => {
                  if (log.canvasImage !== "") {
                    return (
                      <img
                        key={i}
                        className={`canvas-image disable-user-select`}
                        src={log.canvasImage}
                        // alt="0"
                        // onerror="this.style.display='none'"
                      />
                    );
                  }
                })}
                {enableCanvas ? (
                  <Canvas
                    saveCanvas={saveCanvasImage}
                    solution={solution}
                    cancel={cancelCanvas}
                    // log={log}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="log-table">
            {/* <div className={` ${enableSelectBox ? "" : "visibility_hidden"}`}> */}
            {/* <div className="select-box">
       {enableSelectBox ? (
         <SelectBoxClass
           getRange={getRange}
           solution={solution}
           cancel={cancelSelectBox}
           enableCanvas={enableCanvas}
         />
       ) : (
         ""
       )}
     </div> */}
            <LogTable
              log={log}
              deleteLog={deleteLog}
              editRemarks={editRemarks}
              deleteRemarks={deleteRemarks}
              // editLog={editLog}
              deleteRange={deleteRange} //solution is bracket or coil applied
              image={image}
            />
            {/* <h4>tooth LOG changes{logDisplay}</h4> */}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div className="all">
      {log.logs.length !== 0 && chart}
      <div className={`loading ${isLoading ? "" : "display-none"}`}>
        <img className="Loading-gif" src={Loading} alt="loading" />
      </div>
      {/* {image.length!==0? <img className="Loading-gif" src={image["icons"][0]["path"]} alt="loading" />:""} */}
    </div>
  );
}

export default Chart;
