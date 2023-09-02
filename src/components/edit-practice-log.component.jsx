import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/form-styles.css";
import axios from "axios";
import mongoose from "mongoose";

const port = 5001;

// interface IEditPracticeLogProps extends ParameterDecorator {
//   _id: string;
//   username: string;
//   date: Date;
//   focusItems: object;
//   focusItemsKeys: string[];
//   reflection: string;
// }

// class IEditPracticeLogState {
//   date: Date;
//   focusItem1: string;
//   focusItem1Evaluation: number;
//   focusItem2: string;
//   focusItem2Evaluation: number;
//   focusItem3: string;
//   focusItem3Evaluation: number;
//   reflection: string;
// }

const FocusItem = function (props) {
  return (
    <div className="form-group input-group focus-items-form">
      <div className="focus-item">
        <label htmlFor={`focus${props.focusItemNumber}`}>
          Focus Item {props.focusItemNumber} (Optional)
        </label>
        <input
          name={`focus${props.focusItemNumber}`}
          className="form-control"
          type="text"
          required={false}
          value={props.focusItemValue}
          onChange={props.focusItemOnChange}
        />
      </div>

      <div className="focus-item-evaluation">
        <label htmlFor={`focus${props.focusItemNumber}Evaluation`}>
          Performance:{" "}
        </label>
        <input
          name={`focus${props.focusItemNumber}Evaluation`}
          className="form-control"
          type="number"
          required={props.focusItemValue !== ""}
          value={props.focusItemEvaluationValue}
          onChange={props.focusItemEvaluationOnChange}
          min={1}
          max={10}
          placeholder="1-10"
        />
      </div>
    </div>
  );
};

// export default class EditPracticeLog extends Component<
//   IEditPracticeLogProps,
//   IEditPracticeLogState
// > {
export default class EditPracticeLog extends Component {
  // constructor(props: IEditPracticeLogProps) {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeFocusItem1 = this.onChangeFocusItem1.bind(this);
    this.onChangeFocusItem1Evaluation =
      this.onChangeFocusItem1Evaluation.bind(this);
    this.onChangeFocusItem2 = this.onChangeFocusItem2.bind(this);
    this.onChangeFocusItem2Evaluation =
      this.onChangeFocusItem2Evaluation.bind(this);
    this.onChangeFocusItem3 = this.onChangeFocusItem3.bind(this);
    this.onChangeFocusItem3Evaluation =
      this.onChangeFocusItem3Evaluation.bind(this);
    this.onChangeReflection = this.onChangeReflection.bind(this);
    this.onSubmitEdits = this.onSubmitEdits.bind(this);

    this.initStates();
  }

  // private initStates() {
  initStates() {
    this.state = {
      date: this.props.date,
      focusItem1:
        this.props.focusItemsKeys[0] !== undefined
          ? this.props.focusItemsKeys[0]
          : "",
      focusItem1Evaluation: this.props.focusItems[this.props.focusItemsKeys[0]],
      focusItem2:
        this.props.focusItemsKeys[1] !== undefined
          ? this.props.focusItemsKeys[1]
          : "",
      focusItem2Evaluation: this.props.focusItems[this.props.focusItemsKeys[1]],
      focusItem3:
        this.props.focusItemsKeys[2] !== undefined
          ? this.props.focusItemsKeys[2]
          : "",
      focusItem3Evaluation: this.props.focusItems[this.props.focusItemsKeys[2]],
      reflection: this.props.reflection,
    };
  }

  // private onChangeDate(newDate: Date) {
  onChangeDate(newDate) {
    this.setState({
      date: newDate,
    });
  }

  // private onChangeFocusItem1(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem1(e) {
    this.setState({
      focusItem1: e.target.value,
    });
  }

  // private onChangeFocusItem1Evaluation(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem1Evaluation(e) {
    this.setState({
      focusItem1Evaluation:
        e.target.value !== "" ? Number.parseFloat(e.target.value) : undefined,
    });
  }

  // private onChangeFocusItem2(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem2(e) {
    this.setState({
      focusItem2: e.target.value,
    });
  }

  // private onChangeFocusItem2Evaluation(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem2Evaluation(e) {
    this.setState({
      focusItem2Evaluation:
        e.target.value !== "" ? Number.parseFloat(e.target.value) : undefined,
    });
  }

  // private onChangeFocusItem3(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem3(e) {
    this.setState({
      focusItem3: e.target.value,
    });
  }

  // private onChangeFocusItem3Evaluation(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem3Evaluation(e) {
    this.setState({
      focusItem3Evaluation:
        e.target.value !== "" ? Number.parseFloat(e.target.value) : undefined,
    });
  }

  // private onChangeReflection(e: React.ChangeEvent<HTMLTextAreaElement>) {
  onChangeReflection(e) {
    this.setState({
      reflection: e.target.value,
    });
  }

  // private async onSubmitEdits(e: any) {
  async onSubmitEdits(e) {
    e.preventDefault();
    console.log("attempting to submit log");

    let focusItems = {};
    if (this.state.focusItem1 !== "") {
      focusItems[this.state.focusItem1] = this.state.focusItem1Evaluation;
    }
    if (this.state.focusItem2 !== "") {
      focusItems[this.state.focusItem2] = this.state.focusItem2Evaluation;
    }
    if (this.state.focusItem3 !== "") {
      focusItems[this.state.focusItem3] = this.state.focusItem3Evaluation;
    }

    const journalLog = {
      _id: new mongoose.Types.ObjectId(this.props._id),
      username: this.props.username,
      date: this.props.date,
      focusItems,
      reflection: this.state.reflection,
      logComplete: true,
    };

    try {
      const res = await axios.post(
        `http://localhost:${port}/journalLogs/`,
        journalLog
      );
      if (res.status === 200) {
        console.log("success");
        window.location.href = "/";
      } else {
        console.log("failure");
        throw new Error("Could not add log");
      }
    } catch (e) {
      console.error(`Error: ${e instanceof Error ? e.message : e}`);
      window.location.reload();
    }
  }

  render() {
    return (
      <Fragment>
        <br></br>
        <h5>Edit Practice Log</h5>
        {/* in this form we will need the date, optional focusitems, reflection: textarea */}
        <form onSubmit={this.onSubmitEdits}>
          <FocusItem
            focusItemNumber={1}
            focusItemValue={this.state.focusItem1}
            focusItemOnChange={this.onChangeFocusItem1}
            focusItemEvaluationValue={this.state.focusItem1Evaluation}
            focusItemEvaluationOnChange={this.onChangeFocusItem1Evaluation}
          />
          <FocusItem
            focusItemNumber={2}
            focusItemValue={this.state.focusItem2}
            focusItemOnChange={this.onChangeFocusItem2}
            focusItemEvaluationValue={this.state.focusItem2Evaluation}
            focusItemEvaluationOnChange={this.onChangeFocusItem2Evaluation}
          />
          <FocusItem
            focusItemNumber={3}
            focusItemValue={this.state.focusItem3}
            focusItemOnChange={this.onChangeFocusItem3}
            focusItemEvaluationValue={this.state.focusItem3Evaluation}
            focusItemEvaluationOnChange={this.onChangeFocusItem3Evaluation}
          />

          <div>
            <div>
              <label htmlFor="reflection">Reflection</label>
            </div>
            <textarea
              name="reflection"
              className="edit-reflection-text-area"
              required
              value={this.state.reflection}
              onChange={this.onChangeReflection}
              placeholder="Reflect on your practice (required)"
            />
          </div>

          <button type="submit" className="btn button">
            Save Changes
          </button>
        </form>
      </Fragment>
    );
  }
}
