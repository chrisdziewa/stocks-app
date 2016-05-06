import React, { Component } from 'react';
// import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
let Highcharts = require('highcharts/highstock');

class Graph extends Component {

  componentDidMount() {
    if (!this.props.stockData || this.props.stockData.length < 1) {
      console.log('it was null');
      return null;
    }


    let series = this.props.stockData.map((stock) => {
      return {
        name: stock.symbol,
        data: stock.data,
        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
          valueDecimals: 2
        }
      }
    });

    let config = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'Closing Stock Prices'
      },
      yAxis: {
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      series: series
    };

    Highcharts.StockChart('graph', config);
  }

  render() {

        // ... more options - see http://api.highcharts.com/highcharts
    return (
      <div id="graph"></div>
    );
  }
}

export default Graph;
