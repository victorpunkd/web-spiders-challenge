import React, { Component } from "react";
import "./FolderIcon.css";

export class FolderIcon extends Component {
  render() {
    return (
      <div
        key={this.props.id}
        className="w3-quarter folderView w3-animate-opacity w3-tooltip"
        onDoubleClick={() => {
          this.props.openFolderClicked(this.props.id);
        }}
      >
        <span
          style={{
            position: "absolute",
            borderRadius: 15,
            left: 0,
            opacity: 0.8,
            bottom: "108px",
          }}
          className="w3-text w3-tag"
        >
          Double click to open
        </span>
        <div className="folderIcon">
          <i className="fa fa-folder" aria-hidden="true"></i>
        </div>
        <div className="folderName">{this.props.folderName}</div>
      </div>
    );
  }
}

export default FolderIcon;
