import React from 'react';

const StockCard = (props) => {
  return (
    <div className="stock-card">
      <p>{props.symbol}</p>
      <p>{props.fullName}</p>
    </div>
  );
}

export default StockCard;
