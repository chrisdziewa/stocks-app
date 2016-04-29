import React, { Component } from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';

class Graph extends Component {

  componentDidMount() {
    let graph = this.refs.graph.getChart();
    graph.series[0].addPoint({x: 10, y: 12});
  }

  render() {
    let config = {
        title: {
            text: 'Closing Stock Prices'
        },
        series: [{
        data: [1, 3, 2, 4]
      }]
        // ... more options - see http://api.highcharts.com/highcharts
    };
    return (
      <ReactHighcharts
        isPureConfig={true}
        config={config}
        ref="graph"
      >
      </ReactHighcharts>
    );
  }
}

export default Graph;
