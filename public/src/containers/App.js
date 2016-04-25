import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLoadedMessage, getStockData } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.getLoadedMessage();
    this.props.getStockData();
  }

  render() {
    return (
      <div className="app">
        <h1 className="logo">hiStocks</h1>
        <div className="graph">
          This will be the stock history graph
        </div>
        <form>
          <input type="text" placeholder="Stock code"/>
          <button type="submit" className="btn-add">
            Add
          </button>
        </form>

        <div className="stock-card">
          <p>GOOG</p>
        </div>
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

export default connect(mapStateToProps, { getLoadedMessage, getStockData })(App);
