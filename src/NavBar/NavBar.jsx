import React, { Component } from "react";
import "./NavBar.css";

export class NavBar extends Component {
  render() {
    return (
      <div className="navBar">
        <span
          className={`back ${this.props.isBackDisabled ? "backOff" : ""}`}
          onClick={
            this.props.isBackDisabled
              ? console.log()
              : this.props.backButtonClicked
          }
        >
          <i className="fa fa-arrow-circle-left"></i>
        </span>
        <span className="appName">Folder Vault</span>
      </div>
    );
  }
}

export default NavBar;
