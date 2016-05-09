import React, { Component } from 'react';
// import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
let Highcharts = require('highcharts/highstock');

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: ''
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.props = newProps;
      this.updateChart();
    }
  }

  updateChart() {
    let { stockData } = this.props;
    this.state.chart.addSeries(this.formatSingleSeries(stockData[stockData.length - 1]), true, true);
  }

  formatSingleSeries(stock) {
    return {
      name: stock.symbol,
      data: stock.data,
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
        valueDecimals: 2
      }
    }
  }

  initializeSeries() {
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

    return series;
  }

  buildChartConfig() {
    let series = this.initializeSeries();

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

    return config;

  }

  componentDidMount() {
    if (!this.props.stockData || this.props.stockData.length < 1) {
      console.log('it was null');
      return null;
    }

    let config = this.buildChartConfig();

    let graph = Highcharts.StockChart('graph', config);
    this.setState({
      chart: graph
    });
  }

  componentWillUnMount() {
    this.setState({
      chart: ''
    });
  }

  render() {
    console.log(this.state.chart);
        // ... more options - see http://api.highcharts.com/highcharts
    return (
      <div id="graph"></div>
    );
  }
}

export default Graph;
