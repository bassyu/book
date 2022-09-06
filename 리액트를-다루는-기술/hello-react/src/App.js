import React, { Component } from 'react';
import MyComponent from './MyComponent';
import Counter from './Counter';
import Say from './Say';
import EventPractice from './EventPractice';
import ValidationSample from './ValidationSample';
import ScrollBox from './ScrollBox';
import IterationSmaple from './IterationSample';
import LifeCycleSample from './LifeCycleSmaple';
import ErrorBoundary from './ErrorBoundary';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {
  state = {
    color: '#000000',
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <MyComponent name="YU" favoriteNumber={1}>
            CHILDREN VALUE
          </MyComponent>
          <br /> <hr />
          <Counter />
          <br /> <hr />
          <Say />
          <br /> <hr />
          <EventPractice />
          <br /> <hr />
          <ValidationSample />
          <br /> <hr />
          <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
          <button onClick={() => this.scrollBox.scrollToBottom()}>
            To Bottom
          </button>
          <br /> <hr />
          <IterationSmaple />
          <br /> <hr />
          <button onClick={this.handleClick}>Random Color</button>
          <LifeCycleSample color={this.state.color} />
          <br /> <hr />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
