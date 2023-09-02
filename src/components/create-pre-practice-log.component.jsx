import React, { Component, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/form-styles.css";
import axios from "axios";

const port = 5001;

// interface IPrePracticeLogProps extends ParameterDecorator {
//   currentUser: string | undefined;
// }

// class IPrePracticeLogState {
//   date: Date;
//   focusItem1: string;
//   focusItem2: string;
//   focusItem3: string;
// }

const PrePracticeFocusItem = function (props) {
  return (
    <div className="form-group input-group focus-items-form">
      <div className="pre-practice-focus-item">
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
    </div>
  );
};

// export default class CreatePostPracticeLog extends Component<
//   IPrePracticeLogProps,
//   IPrePracticeLogState
// > {
export default class CreatePostPracticeLog extends Component {
  // constructor(props: IPrePracticeLogProps) {
  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeFocusItem1 = this.onChangeFocusItem1.bind(this);
    this.onChangeFocusItem2 = this.onChangeFocusItem2.bind(this);
    this.onChangeFocusItem3 = this.onChangeFocusItem3.bind(this);
    this.onSubmitLog = this.onSubmitLog.bind(this);

    this.state = {
      date: new Date(),
      focusItem1: "",
      focusItem2: "",
      focusItem3: "",
    };
  }

  // private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   const {name, value} = event.target;
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // }

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

  // private onChangeFocusItem2(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem2(e) {
    this.setState({
      focusItem2: e.target.value,
    });
  }

  // private onChangeFocusItem3(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFocusItem3(e) {
    this.setState({
      focusItem3: e.target.value,
    });
  }

  // private async onSubmitLog(e: any) {
  async onSubmitLog(e) {
    e.preventDefault();
    console.log("attempting to submit log");

    let focusItems = {};
    if (this.state.focusItem1 !== "") {
      focusItems[this.state.focusItem1] = null;
    }
    if (this.state.focusItem2 !== "") {
      focusItems[this.state.focusItem2] = null;
    }
    if (this.state.focusItem3 !== "") {
      focusItems[this.state.focusItem3] = null;
    }

    console.log(focusItems);

    const journalLog = {
      username: this.props.currentUser,
      date: this.state.date,
      focusItems: focusItems,
      reflection: "",
      logComplete: false,
    };

    console.log("journal log:", journalLog);

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
      console.error(
        `Error trying to log in: ${e instanceof Error ? e.message : e}`
      );
      window.location.reload();
    }
  }

  render() {
    return this.props.currentUser !== undefined ? (
      <Fragment>
        <h4 className="form-title p-2">Create a new Pre Practice Log</h4>
        {/* in this form we will need the date, optional focusitems, reflection: textarea */}
        <form className="pre-practice-form p-2" onSubmit={this.onSubmitLog}>
          <div>
            {/* add "for=dateOfPractice" */}
            <label>Date of Practice</label>
            <DatePicker
              name="dateOfPractice"
              selected={this.state.date}
              onChange={this.onChangeDate}
              minDate={new Date()}
              required
            />
          </div>

          <div className="mb-2">
            <PrePracticeFocusItem
              focusItemNumber={1}
              focusItemValue={this.state.focusItem1}
              focusItemOnChange={this.onChangeFocusItem1}
            />
            <PrePracticeFocusItem
              focusItemNumber={2}
              focusItemValue={this.state.focusItem2}
              focusItemOnChange={this.onChangeFocusItem2}
            />
            {/* make this.handleChange into callback => handleChange(correctName) */}
            <PrePracticeFocusItem
              focusItemNumber={3}
              focusItemValue={this.state.focusItem3}
              focusItemOnChange={this.onChangeFocusItem3}
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
