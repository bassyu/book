import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  static defaultProps = {
    name: 'DEFAULT',
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };
  render() {
    const { name, favoriteNumber, children } = this.props;

    return (
      <div>
        hi my name is {name}. <br />
        children vlaue is {children}. <br />
        and my favorite number is {favoriteNumber}
      </div>
    );
  }
}

export default MyComponent;
