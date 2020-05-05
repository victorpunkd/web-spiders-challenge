import React, { Component } from "react";
import "./WorkArea.css";
import { FolderIcon } from "../FolderIcon/FolderIcon";
export class WorkArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: this.props.folderStructure,
      folderStack: [],
    };
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.backPressed !== this.props.backPressed) {
      this.goBack();
    }
  };

  goBack = () => {
    let i = 0,
      tempArray = this.state.folderStack,
      currentFolder = this.props.folderStructure;
    while (i < this.state.folderStack.length - 1) {
      let stackId = this.state.folderStack[i];
      currentFolder = currentFolder.filter((element) => element.id === stackId);
      currentFolder = currentFolder[0].subFolder;
      i++;
    }
    tempArray.pop();
    this.setState({ currentFolder: currentFolder, folderStack: tempArray });
    this.props.folderStackStatus(tempArray);
  };

  handleOpenFolderClick = (id) => {
    let tempFolderStack = this.state.folderStack;
    tempFolderStack = [...tempFolderStack, id];
    this.setState({ folderStack: tempFolderStack });
    let tempFolder = this.state.currentFolder.filter((data) => data.id === id);
    this.setState({
      currentFolder: tempFolder[0].subFolder,
    });
    this.props.folderStackStatus(tempFolderStack);
  };

  render() {
    return (
      <div className="workArea w3-row">
        {this.state.currentFolder.map((data) => (
          <FolderIcon
            key={data.id}
            folderName={data.name}
            id={data.id}
            openFolderClicked={this.handleOpenFolderClick}
          />
        ))}

        <div
          onClick={this.props.createNewFolderClicked}
          className="w3-quarter folderView w3-animate-opacity"
        >
          <div className="newFolderIcon">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
          <div className="folderName">Create New folder</div>
        </div>
      </div>
    );
  }
}

export default WorkArea;
