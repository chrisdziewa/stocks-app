import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import { connect } from 'react-redux';

let Highcharts = require('highcharts/highstock');

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: ''
    };
  }

  shouldComponentUpdate() {
    return false;
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

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      let [symbol, event] = newProps.event;
      if (event === 'add') {
        this.addToSeries(symbol);
      } else if (event === 'delete') {
        this.removeFromSeries(symbol);
      }
    }
  }

  addToSeries(symbol) {
    let { stockData } = this.props;
    let { chart } = this.state;
    let isNew = true;
    chart.series.forEach((series, index) => {
      if (series.name === symbol) {
        isNew = false;
      }
      
    });
    if (isNew) {
      chart.addSeries(this.formatSingleSeries(stockData[stockData.length - 1]), true, true);
    }
  }

  removeFromSeries(symbol) {
    let { chart } = this.state;
    let indexToDelete = 1;
    chart.series.forEach((series, index) => {
      if (series.name === symbol) {
        indexToDelete = index;
        console.log('index: ', indexToDelete);
      }
    });

    if (indexToDelete) {
      console.log(indexToDelete);
      if (indexToDelete > 0) {
        indexToDelete--;
      }
      chart.series[indexToDelete].remove(false);
    }
  }

  formatSingleSeries(stock) {
    return {
      name: stock.symbol,
      data: stock.data
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

  componentWillUnMount() {
    this.setState({
      chart: ''
    });
  }

  render() {
        // ... more options - see http://api.highcharts.com/highcharts
    return (
      <div id="graph"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    event: state.stocks.event
  }
}

export default connect(mapStateToProps, null)(Graph);
