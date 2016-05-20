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
    if (text !== '' && this.props.currentSymbols.indexOf(text.toUpperCase()) === -1 && 
          text.length > 0) {
      this.props.addStock(text);
      this.setState({
        text: ''
      });
    } else {
      this.props.setErrorMessage('Already tracking this stock');
    }
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }

  clearError() {
    this.props.removeErrorMessage();
  }

  render() {
    return (
     <div> 
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
           <p className="error-text">{ this.props.error } 
            {
              this.props.error !== '' ? 
              <button 
                className="close-error"
                onClick={this.clearError.bind(this)}
                >
                  X
                  </button>
              : null
            }
           </p>
      </div>  
    );
  }
}

export default StockInput;
