import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  addStock,
  getSavedStockSymbols,
  deleteStock
} from '../actions';

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
          deleteStock={this.props.deleteStock.bind(this)}
        />
      )
    });

    return stockCards;
  }

  render() {
    return (
      <div className="app">
        <h1 className="logo">hiStocks</h1>
        <div id="graph-container">
        </div>
        {
          this.props.stockData && this.props.stockData.length > 0 && this.props.stockData.length === this.props.symbolList.length ?
            <Graph stockData={this.props.stockData}/>
          : <div>Not currently tracking any stocks</div>
        }
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

const mapDispatchToProps = (dispatch) => {
  return {
    addStock: bindActionCreators(addStock, dispatch),
    getSavedStockSymbols: bindActionCreators(getSavedStockSymbols, dispatch),
    deleteStock: bindActionCreators(deleteStock, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
