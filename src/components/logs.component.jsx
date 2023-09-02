import React, { Component } from "react";
import JournalLog from "./journal-log.component.jsx";
import axios from "axios";

const port = 5001;


// interface ILogProps extends ParameterDecorator {
//   currentUser: string | undefined;
// }

// class ILogState {
//   incompleteLogs: any;
//   completedLogs: any;
// }

// export default class Logs extends Component<ILogProps, ILogState> {
export default class Logs extends Component {
  // constructor(props: ILogProps) {
  constructor(props) {
    super(props);

    this.state = {
      incompleteLogs: [],
      completedLogs: [],
    };
  }

  async componentDidMount() {
    try {
      let config = {
        params: {
          username: this.props.currentUser,
          logComplete: false,
        },
      };

      let res = await axios.get(`http://localhost:${port}/journallogs/`, config);
      // res.data.sort((d1: { date: string }, d2: { date: string }) => {
      res.data.sort((d1, d2) => {
        return (
          new Date(d2.date.slice(0, 10)).getTime() -
          new Date(d1.date.slice(0, 10)).getTime()
        );
      });

      this.setState({
        incompleteLogs: res.data,
      });

      config = {
        params: {
          username: this.props.currentUser,
          logComplete: true,
        },
      };

      res = await axios.get(`http://localhost:${port}/journallogs/`, config);
      res.data.sort((d1, d2) => {
        return (
          new Date(d2.date.slice(0, 10)).getTime() -
          new Date(d1.date.slice(0, 10)).getTime()
        );
      });

      this.setState({
        completedLogs: res.data,
      });
    } catch (e) {
      console.error(`Error: ${e instanceof Error ? e.message : e}`);
    }
  }

  renderIncompleteLogs() {
    return this.state.incompleteLogs.map((currentLog) => {
      return (
        <JournalLog
          _id={currentLog._id}
          date={currentLog.date}
          focusItems={currentLog.focusItems}
          reflection={currentLog.reflection}
          complete={currentLog.logComplete}
        />
      );
    });
  }

  renderCompletedLogs() {
    return this.state.completedLogs.map((currentLog) => {
      return (
        <JournalLog
          _id={currentLog._id}
          date={currentLog.date}
          focusItems={currentLog.focusItems}
          reflection={currentLog.reflection}
          complete={currentLog.logComplete}
        />
      );
    });
  }

  render() {
    return this.props.currentUser !== undefined ? (
      <div>
        <div>
          {this.state.incompleteLogs.length > 0 && <h2>Incomplete logs</h2>}
          {this.renderIncompleteLogs()}
        </div>
        <div>
          {this.state.completedLogs.length > 0 && <h2>Completed logs</h2>}
          {this.renderCompletedLogs()}
        </div>
      </div>
    ) : (
      <div>Sign in to view your logs</div>
    );
  }
}
