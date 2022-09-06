import React, { Component } from 'react';

// 클래스 에서 state 를 사용
class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0,
  };
  render() {
    // state 조회는 this.state 사용
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>Fixed Number : {fixedNumber}</h2>
        <button
          onClick={() => {
            this.setState(
              {
                number: number + 1,
              },
              () => {
                console.log('called setState()');
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
