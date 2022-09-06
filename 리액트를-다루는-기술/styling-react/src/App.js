import React, { Component } from "react";
import SassComponent from "./SassComponent";
import CSSModule from "./CSSModule";
import StyledComponent from "./StyledComponent";

class App extends Component {
  render() {
    return (
      <div>
        <SassComponent />
        <br /> <hr />
        <CSSModule />
        <br /> <hr />
        <StyledComponent />
      </div>
    );
  }
}

export default App;
