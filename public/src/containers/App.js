import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLoadedMessage } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.getLoadedMessage();
  }

  render() {
    return (
      <div className="app">
        <p>I am the app component</p>
        {this.props.loadedMessage}
      </div>
    );
  }
}

// Connect State and Dispatch to props for container element
const mapStateToProps = (state) => {
  return {
    loadedMessage: state.main.message
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   }
// }

export default connect(mapStateToProps, { getLoadedMessage })(App);
