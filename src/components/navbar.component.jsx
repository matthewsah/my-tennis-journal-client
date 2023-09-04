import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

// interface INavbarProps extends ParameterDecorator {
//   currentUser: string | undefined;
// }

// export default class Navbar extends Component<INavbarProps, {}> {
export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        { this.props.windowWidth > 500 &&
        <Link to="/" className="navbar-brand">
          <img
            src="https://clipartix.com/wp-content/uploads/2016/10/Bouncing-tennis-ball-clipart-free-images.png"
            className="navbar-image"
            alt="tennis-ball"
          />
          My Tennis Journal
        </Link>}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Logs
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createprepracticelog" className="nav-link">
                Create Pre Practice Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createpostpracticelog" className="nav-link">
                Create Post Practice Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/account" className="nav-link">
                {this.props.currentUser !== undefined ? "Account" : "Log in"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
