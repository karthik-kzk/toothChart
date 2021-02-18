import React, { Component } from "react";
import "./SelectBoxClass.css";

// type declaration in typescript

type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  optionSelect: {
    [k: string]: string | undefined;   
  };  
  select1: string[];
  select2: string[];
  exportArray: string[];
  startIndex: number;
  endIndex: number;
  bracketTypeValue: string;
  single: boolean;
  multiple: boolean;
};

type Array={
  [k:string]:string[];
}

export default class SelectBoxClass extends Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      optionSelect: {
        select1: "",
        select2: "",
      },
      select1: [],
      select2: [],
      exportArray: [],
      startIndex: -1,
      endIndex: -1,
      bracketTypeValue: "",
      single: false,
      multiple: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.select2Options = this.select2Options.bind(this);
    this.select1Option = this.select1Option.bind(this);
    this.setEndRange = this.setEndRange.bind(this);
    this.submit = this.submit.bind(this);
    this.setStartRange = this.setStartRange.bind(this);
    this.bracketOptionHandleChange = this.bracketOptionHandleChange.bind(this);
    this.multipleSingleSelectOption = this.multipleSingleSelectOption.bind(
      this
    );
  }

  array:Array = {
    upperTeeth: [
      "tooth18",
      "tooth17",
      "tooth16",
      "tooth15",
      "tooth14",
      "tooth13",
      "tooth12",
      "tooth11",
      "tooth21",
      "tooth22",
      "tooth23",
      "tooth24",
      "tooth25",
      "tooth26",
      "tooth27",
      "tooth28",
    ],
    lowerTeeth: [
      "tooth38",
      "tooth37",
      "tooth36",
      "tooth35",
      "tooth34",
      "tooth33",
      "tooth32",
      "tooth31",
      "tooth41",
      "tooth42",
      "tooth43",
      "tooth44",
      "tooth45",
      "tooth46",
      "tooth47",
      "tooth48",
    ],
  };

  fullArray = [
    "tooth18",
    "tooth17",
    "tooth16",
    "tooth15",
    "tooth14",
    "tooth13",
    "tooth12",
    "tooth11",
    "tooth21",
    "tooth22",
    "tooth23",
    "tooth24",
    "tooth25",
    "tooth26",
    "tooth27",
    "tooth28",
    "tooth38",
    "tooth37",
    "tooth36",
    "tooth35",
    "tooth34",
    "tooth33",
    "tooth32",
    "tooth31",
    "tooth41",
    "tooth42",
    "tooth43",
    "tooth44",
    "tooth45",
    "tooth46",
    "tooth47",
    "tooth48",
  ];

  handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    let optionSelect = { ...this.state.optionSelect };
    const value: string | undefined = evt.target.value;
    const name: string | undefined = evt.target.name;
    optionSelect[name] = value;
  
    this.setState({
      optionSelect
    } );
  }

  multipleSingleSelectOption(evt: React.ChangeEvent<HTMLSelectElement>) {    
    this.setState({
      [evt.target.value]: true,
    } as any);
  }

  select2Options() {
    //   let endIndex = this.array.length;
    //  console.log(endIndex)
    //   if (this.state.optionSelect !== "") {
    //     let startIndex =0
    //     let array2 = [];
    //     startIndex = this.state.select1.findIndex((e) => e ==  this.state.optionSelect.select1);
    //    array2 = this.state.select1.slice(startIndex + 1, endIndex);
    //     this.setState({select2:this.array2});
    //     this.setState({...this.state.range,startIndex:startIndex});
    //   }
  }

  bracketOptionHandleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ bracketTypeValue: evt.target.value });
  }

  select1Option(evt: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ select1: this.array[evt.target.value] } );
  }

  setStartRange() {
    let endIndex= this.state.select1.length; 
     
    let startIndex = -1;
    let array2 = [];
    startIndex = this.state.select1.findIndex(
      (e) => e === this.state.optionSelect.select1
    );
    array2 = this.state.select1.slice(startIndex + 1, endIndex);
    this.setState({ select2: [...array2] });
    this.setState({ startIndex: startIndex });
  }

  setEndRange() {
    let endIndex = 0;
    endIndex = this.state.select1.findIndex(
      (e) => e === this.state.optionSelect.select2
    );
    this.setState({ endIndex: endIndex });
  }

  submit() {
    let array2;
    if (this.state.single && this.state.startIndex !== null) {
      array2 = this.state.select1.slice(
        this.state.startIndex,
        this.state.startIndex + 1
      );
    } else {
      array2 = this.state.select1.slice(
        this.state.startIndex,
        this.state.endIndex + 1
      );
    }

    let from = this.state.optionSelect.select1;
    let to = this.state.optionSelect.select2;
    // this.props.getRange(array2, from, to, this.state.bracketTypeValue);
  }

  componentDidUpdate() {
    // this.select2Options()
    console.log(this.state.startIndex);
    console.log(this.state)
    // console.log(this.state.select2)
    // console.log(this.state.endIndex)
  }

  // solution props structure
  // const [solution, setSolution] = useState({
  //   coilSpringApplied: 0,
  //   wireApplied: false,
  //   bracketApplied: 0,
  //   chainApplied:0,
  //   rubberBandApplied:0,

  // });

  render() {
    const canvasSelectOption = () => {
      // console.log("🚀 ~ file: SelectBox.js ~ line 141 ~ SelectBoxClass ~ solutionOption ~ this.props.solution.bracketApplied", this.props.solution.bracketApplied);
      return (
        <div>
          <label>select range from :</label>
          <select
            id="functions"
            name="select1"
            onChange={this.handleChange}
            className="form-control"
          >
            <option>select</option>
            {this.fullArray.map((val, i) => {
              return <option>{val}</option>;
            })}
          </select>
          <label htmlFor="functions">To:</label>
          <select
            id="functions"
            name="select2"
            onChange={this.handleChange}
            className="form-control"
          >
            <option>select</option>
            {this.fullArray.map((val, i) => {
              return <option>{val}</option>;
            })}
          </select>
        </div>
      );
    };

    // const displayText = () => {
    //   if (this.props.solution.coilSpringApplied) {
    //     return "Coiled Spring";
    //   } else if (this.props.solution.wireApplied) {
    //     return "Wire";
    //   } else if (this.props.solution.bracketApplied) {
    //     return "Bracket";
    //   } else if (this.props.solution.chainApplied) {
    //     return "Chain";
    //   } else {
    //     return "RubberBand";
    //   }
    // };

    return (
      <div className="selectBox card  ">
        {/* heading  */}
        <div className="select-box-heading card-header ">
          {/* {displayText()} */}
        </div>
        <div className="card-body">
          {/* {this.props.enableCanvas ? (
            // canvas range set here
            canvasSelectOption()
          ) : ( */}
          <div className="teeth-range-segment-from-to">
            {/* teethRange single multiple */}
            <div className="teeth-range-teeth-segment">
              <label>Tooth Range</label>
              <select
                onChange={this.multipleSingleSelectOption}
                className="form-control "
              >
                <option>select</option>
                <option value="multiple" selected>
                  Multiple
                </option>
                <option value="single">Single</option>
              </select>

              {/* teethSegment */}
              <div className="teethSegment">
                <label>Teeth Segment</label>
                <select
                  id="functions"
                  name="primarySelect"
                  onChange={this.select1Option}
                  className="form-control "
                >
                  <option>select</option>
                  <option value="upperTeeth">Upper Teeth</option>
                  <option value="lowerTeeth">Lower Teeth</option>
                </select>
              </div>
            </div>
            {/* from to range input */}
            <div className="from-to-selectBox">
              <label htmlFor="functions">Select from :</label>
              <div className="selectBox-with-ok-button">
                <select
                  id="functions"
                  name="select1"
                  onChange={this.handleChange}
                  className="form-control "
                >
                  <option>select</option>
                  {this.state.select1.map((val, i) => {
                    return <option value={`${val}`}> {val}</option>;
                  })}
                </select>

                <button
                  onClick={this.setStartRange}
                  className="btn btn-outline-secondary"
                >
                  ok
                </button>
              </div>

              {this.state.single ? (
                ""
              ) : (
                <div className="to">
                  <label htmlFor="functions">to:</label>
                  <div className="selectBox-with-ok-button">
                    <select
                      name="select2"
                      id="functions"
                      onChange={this.handleChange}
                      className="form-control "
                    >
                      <option>select</option>
                      {this.state.select2.map((val) => {
                        return <option value={`${val}`}>{val}</option>;
                      })}
                    </select>

                    <button
                      onClick={this.setEndRange}
                      className="btn btn-outline-secondary"
                    >
                      ok
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* )} */}
          {/* submit cancel button */}
          <div className="select-box-buttons">
            <div>
              <button onClick={this.submit} className="btn btn-outline-success">
                Submit
              </button>
              <button
                // onClick={this.props.cancel}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
