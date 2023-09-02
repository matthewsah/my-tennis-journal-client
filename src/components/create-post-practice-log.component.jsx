import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/form-styles.css";
import axios from "axios";

// interface IPostPracticeLogProps extends ParameterDecorator {
//   currentUser: string | undefined;
// }

// class IPostPracticeLogState {
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
          Performance
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

// export default class CreatePostPracticeLog extends Component<
//   IPostPracticeLogProps,
//   IPostPracticeLogState
// > {
export default class CreatePostPracticeLog extends Component {
  // constructor(props: IPostPracticeLogProps) {
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
    this.onSubmitLog = this.onSubmitLog.bind(this);

    this.state = {
      date: new Date(),
      focusItem1: "",
      focusItem1Evaluation: undefined,
      focusItem2: "",
      focusItem2Evaluation: undefined,
      focusItem3: "",
      focusItem3Evaluation: undefined,
      reflection: "",
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

  onChangeFocusItem3(e) {
    this.setState({
      focusItem3: e.target.value,
    });
  }

  onChangeFocusItem3Evaluation(e) {
    this.setState({
      focusItem3Evaluation:
        e.target.value !== "" ? Number.parseFloat(e.target.value) : undefined,
    });
  }

  onChangeReflection(e) {
    this.setState({
      reflection: e.target.value,
    });
  }

  // private async onSubmitLog(e: any) {
  async onSubmitLog(e) {
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
      username: this.props.currentUser,
      date: this.state.date,
      focusItems,
      reflection: this.state.reflection,
      logComplete: true,
    };

    console.log("journal log:", journalLog);

    try {
      const res = await axios.post(
        `https://my-tennis-journal-d8d0b4b98cb4.herokuapp.com/journalLogs/`,
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
      console.error(
        `Error trying to log in: ${e instanceof Error ? e.message : e}`
      );
      window.location.reload();
    }
  }

  render() {
    return this.props.currentUser !== undefined ? (
      <Fragment>
        <h4 className="form-title p-2">Create a new Post Practice Log</h4>
        {/* in this form we will need the date, optional focusitems, reflection: textarea */}
        <form className="post-practice-form p-2" onSubmit={this.onSubmitLog}>
          <div>
            <label>Date of Practice</label>
            <DatePicker
              name="dateOfPractice"
              selected={this.state.date}
              onChange={this.onChangeDate}
              maxDate={new Date()}
              required
            />
          </div>

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
              className="reflection-text-area"
              value={this.state.reflection}
              onChange={this.onChangeReflection}
              placeholder="Reflect on your practice (required)"
            />
          </div>

          <button type="submit" className="btn button">
            Create Log
          </button>
        </form>
      </Fragment>
    ) : (
      <div>You'll need to log in first</div>
    );
  }
}
