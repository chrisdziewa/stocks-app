import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStockData, addStock, getSavedStockSymbols } from '../actions';

import StockInput from '../components/StockInput';
import StockCard from '../components/StockCard';
import Graph from '../components/Graph';

class App extends Component {
  componentWillMount() {
    this.props.getSavedStockSymbols();
  }

  renderStockCards() {
    if (this.props.stockData && this.props.stockData.length < 1) {
      return null;
    }
    let stockCards = this.props.stockData.map(stock => {
      return (
        <StockCard
          key={stock.symbol}
          symbol={stock.symbol}
          fullName={stock.fullName}
        />
      )
    });

    return stockCards;
  }

  render() {
    return (
      <div className="app">
        <h1 className="logo">hiStocks</h1>
        <div className="graph-container">
        </div>
        <Graph />
        <StockInput
          addStock={this.props.addStock.bind(this)}
          currentSymbols={this.props.symbolList}
        />
        <div className="current-stocks">
          {this.renderStockCards()}
        </div>
      </div>
    );
  }
}

// Connect State and Dispatch to props for container element
const mapStateToProps = (state) => {
  return {
    symbolList: state.stocks.symbolList,
    stockData: state.stocks.data
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   }
// }

export default connect(mapStateToProps, { getStockData, addStock, getSavedStockSymbols })(App);
