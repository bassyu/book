import React, { Component } from "react";

class HistorySample extends Component {
  handleGoBack = () => {
    this.props.history.goBack();
  };
  handleGoHome = () => {
    this.props.history.push("/");
  };
  componentDidMount() {
    this.unblock = this.props.history.block("you want really exit?");
  }
  componentWillUnmount() {
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>back</button>
        <button onClick={this.handleGoHome}>home</button>
      </div>
    );
  }
}

export default HistorySample;
