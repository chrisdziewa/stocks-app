import React, { Component } from 'react';

class StockCard extends Component {

  handleClick(e) {
    e.preventDefault();
    this.props.deleteStock(this.props.symbol);
  }

  render() {
    let endString = this.props.fullName.indexOf(')');
    let fullName = this.props.fullName.substr(0, endString + 1);
    return (
      <div className="stock-card">
        <div className="stock-card__inner">
          <p>{this.props.symbol}</p>
          <p>{fullName}</p>
          <button
            className="close"
            onClick={this.handleClick.bind(this)}
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default StockCard;
