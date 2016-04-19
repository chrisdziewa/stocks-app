import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/style.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import App from './containers/App';

let store;

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer, applyMiddleware(thunk, logger())
  );

  module.hot.accept('./reducers', () => {
    const nextRootReducer = () => {
      require('./reducers');
      store.replaceReducer(nextRootReducer);
    }
  });

  // Hot module reloading:

  if (module.hot) {
    module.hot.accept();
  }
}

else {
  store = createStore(
    rootReducer, applyMiddleware(thunk)
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#container'));
