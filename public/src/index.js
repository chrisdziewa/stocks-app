import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/style.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import App from './containers/App';
import io from 'socket.io-client';

const socket = io();
const socketMiddleware = createSocketIoMiddleware(socket, "server/");

let store;

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer, applyMiddleware(thunk, socketMiddleware,logger())
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
    rootReducer, applyMiddleware(thunk, socketMiddleware)
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.querySelector('#container'));
