import React, { Component } from 'react';

class StockInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let { text } = this.state
    if (this.props.currentSymbols.indexOf(text) === -1 &&
          text.length > 0) {
      this.props.addStock(text);
      this.setState({
        text: ''
      });
    } else {
      console.log('Already tracking this stock');
    }
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit.bind(this)}
      >
        <input
          onChange={this.updateInput.bind(this)}
          value={this.state.text}
          type="text"
          placeholder="Stock code"
        />
        <button
          type="submit"
          className="btn-add"
        >
          Add
        </button>
      </form>
    );
  }
}

export default StockInput;
