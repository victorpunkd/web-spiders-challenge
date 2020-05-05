import React, { Component } from "react";
import { WorkArea } from "./WorkArea/WorkArea";
import { NavBar } from "./NavBar/NavBar";
import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      folderStructure: [
        /* {
          id: 1,
          name: "Movie",
          subFolder: [
            {
              id: 1,
              name: "English",
            },
            {
              id: 2,
              name: "Bengali",
            },
          ],
        },
        {
          id: 2,
          name: "Songs",
          subFolder: [
            {
              id: 1,
              name: "English",
            },
            {
              id: 2,
              name: "Bengali",
            },
          ],
        },*/
      ],
      folderNavigation: "./",
      folderStack: [],
      backPressed: false,
    };
  }

  folderTraversal = (folderStack, folderStructure) => {
    let currentFolder = folderStructure,
      i = 0;
    while (i < folderStack.length) {
      let stackId = folderStack[i];
      currentFolder = currentFolder.filter((element) => element.id === stackId);
      currentFolder = currentFolder[0].subFolder;
      i++;
    }
    return currentFolder;
  };

  handleFolderStackUpdate = (stackArray) => {
    let folderNavigation = "",
      currentFolder = this.state.folderStructure,
      i = 0;
    while (i < stackArray.length) {
      let stackId = stackArray[i];
      currentFolder = currentFolder.filter((element) => element.id === stackId);
      folderNavigation = folderNavigation + currentFolder[0].name + "/";
      currentFolder = currentFolder[0].subFolder;
      i++;
    }
    this.setState({
      folderNavigation: "./" + folderNavigation,
      folderStack: stackArray,
    });
  };

  handleCreateNewFolderClick = () => {
    let folderName = prompt("Enter folder name", "");
    if (folderName === null) {
      return;
    } else if (folderName.trim() === "") {
      alert("Not a valid folder name");
      return;
    } else if (folderName.length > 30) {
      alert("Folder name should be less than 30 characters");
      return;
    }
    let id = Date.now();
    let tempArray = this.state.folderStructure;
    if (this.state.folderStack.length === 0) {
      tempArray.push({ id: id, name: folderName, subFolder: [] });
    } else {
      let i = 0,
        objectLiteral = "tempArray",
        currentElement = tempArray;
      while (i < this.state.folderStack.length) {
        let j = 0;
        while (j < currentElement.length) {
          if (currentElement[j].id === this.state.folderStack[i]) {
            objectLiteral = `${objectLiteral}[${j}].subFolder`;
            currentElement = currentElement[j].subFolder;
            break;
          }
          j++;
        }
        i++;
      }
      eval(objectLiteral).push({
        id: id,
        name: folderName,
        subFolder: [],
      });
    }
    this.setState({ folderStructure: tempArray });
  };

  handleBackButtonClick = () => {
    this.setState({ backPressed: !this.state.backPressed });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          isBackDisabled={this.state.folderStack.length > 0 ? false : true}
          backButtonClicked={this.handleBackButtonClick}
        />
        <div className="folderNavigation">{this.state.folderNavigation}</div>
        <WorkArea
          folderStructure={this.state.folderStructure}
          folderStackStatus={this.handleFolderStackUpdate}
          createNewFolderClicked={this.handleCreateNewFolderClick}
          backPressed={this.state.backPressed}
        />
      </div>
    );
  }
}

export default App;
