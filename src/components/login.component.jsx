import React, { Component, Fragment } from "react";
import "../styles/form-styles.css";
import axios from "axios";

const port = 5001;

// interface ILoginProps extends ParameterDecorator {
//   currentUser: string | undefined;
//   changeUser: any;
// }

// class ILoginState {
//   username: string;
//   password: string;
//   newUsername: string;
//   newPassword: string;
//   firstName: string;
//   lastName: string;
// }

// export default class Login extends Component<ILoginProps, ILoginState> {
export default class Login extends Component {
  // constructor(props: ILoginProps) {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);

    this.onChangeNewUsername = this.onChangeNewUsername.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.onSubmitNewUser = this.onSubmitNewUser.bind(this);

    this.onSubmitLogOut = this.onSubmitLogOut.bind(this);

    this.state = {
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      firstName: "",
      lastName: "",
    };
  }

  // onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  // onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  // onChangeNewUsername(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeNewUsername(e) {
    this.setState({
      newUsername: e.target.value,
    });
  }

  // onChangeNewPassword(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value,
    });
  }

  // onChangeFirstName(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  // onChangeLastName(e: React.ChangeEvent<HTMLInputElement>) {
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  // async onSubmitLogin(e: any) {
  async onSubmitLogin(e) {
    e.preventDefault();
    console.log(
      `submitting loginnnn form with username: ${this.state.username} and password: ${this.state.password}`
    );
    const config = {
      params: {
        username: this.state.username,
        password: this.state.password,
      },
    };

    try {
      const res = await axios.get(`http://localhost:${port}/users/login`, config);
      if (res.status === 200) {
        console.log("success");
        await this.props.changeUser(this.state.username);
        window.localStorage.setItem("user", `${this.state.username}`);
        window.location.href = "/";
      } else {
        console.log("failure");
        setTimeout( () => console.log('hi'), 1000);
        throw new Error("Could not log in");
      }
    } catch (e) {
      console.error(
        `Error trying to log in: ${e instanceof Error ? e.message : e}`
      );
      window.location.reload();
    }
  }

  // async onSubmitNewUser(e: any) {
  async onSubmitNewUser(e) {
    e.preventDefault();
    console.log("in new user");
    console.log(
      `submitting new user form with username: ${this.state.newUsername} and password: ${this.state.newPassword}`
    );

    const userInfo = {
      username: this.state.newUsername,
      password: this.state.newPassword,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    try {
      const res = await axios.post(`http://localhost:${port}/users/`, userInfo);
      if (res.status === 200) {
        console.log("success");
      } else {
        console.log("failure");
      }
    } catch (e) {
      console.error(
        `Error trying to add new user: ${e instanceof Error ? e.message : e}`
      );
    }
    window.location.reload();
  }

  // onSubmitLogOut(e: any) {
  onSubmitLogOut(e) {
    e.preventDefault();
    console.log("signing out");

    // set the current user to undefined
    this.props.changeUser(undefined);
    window.localStorage.clear();
  }

  render() {
    if (this.props.currentUser === undefined) {
      return (
        <Fragment>
          <div className="mb-4">
            <h3 className="form-title p-2">Log in</h3>
            <form className="login-form p-2" onSubmit={this.onSubmitLogin}>
              <div className="login-form-inputs">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  className="form-control mb-2"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />

                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="form-control mb-2"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />

                <button type="submit" className="btn button">
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div>
            <h3 className="form-title p-2">Create a new Account</h3>
            <form
              className="create-account-form p-2"
              onSubmit={this.onSubmitNewUser}
            >
              <div className="create-account-form-inputs">
                <label htmlFor="create-account-username">Username</label>
                <input
                  name="create-account-username"
                  type="text"
                  required
                  className="form-control mb-2"
                  value={this.state.newUsername}
                  onChange={this.onChangeNewUsername}
                />

                <label htmlFor="create-account-password">Password</label>
                <input
                  name="create-account-password"
                  type="password"
                  required
                  className="form-control mb-2"
                  value={this.state.newPassword}
                  onChange={this.onChangeNewPassword}
                />

                <label htmlFor="first-name">First Name</label>
                <input
                  name="first-name"
                  type="text"
                  required
                  className="form-control mb-2"
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                />

                <label htmlFor="last-name">Last Name</label>
                <input
                  name="last-name"
                  type="text"
                  required
                  className="form-control mb-2"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                />

                <button type="submit" className="btn button">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <h4>You are logged in as {this.props.currentUser}, not you?</h4>
          <form onSubmit={this.onSubmitLogOut}>
            <div className="form-group">
              <button type="submit" className="btn button">
                Log out
              </button>
            </div>
          </form>
        </Fragment>
      );
    }
  }
}
