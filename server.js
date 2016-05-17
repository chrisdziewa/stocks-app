'use strict';

const express = require('express');
const app = express();
const myApp = require('./app');
const routes = myApp.routes;
const PORT = process.env.PORT || 3000;
const db = require('./app/db');
const config = require('./app/config/index');
const webpack = require('webpack');
const bodyParser = require('body-parser');

const isDevMode = (process.env.NODE_ENV !== 'production');

// Route middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));


if (isDevMode) {
  // Use Webpack Hot middleware in development
  (function () {

    // Create & configure a webpack compiler
    const webpack = require('webpack');
    const webpackConfig = require(process.cwd() + '/webpack-dev.config.js');
    const compiler = webpack(webpackConfig);

    // Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      headers: { "Access-Control-Allow-Origin":
        "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true"
      },
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000
    }));
  })();
}


// Mount routes here
app.use('/api/stocks', routes.stocks);

const server = app.listen(PORT, () => {
  console.log('App listening on port ' + PORT);
});

const io = require('socket.io')(server);

// Socket.io
io.on('connection', function(socket){
  console.log("User connected with socket: " + socket.id);
  socket.on('message', function(data) {
    socket.broadcast.emit(data);
  });

  socket.on('action', (action) => {
    if(action.type === 'server/ADD_STOCK'){
      console.log('Called ADD_STOCK!');
      socket.broadcast.emit('action', {type:'ADD_STOCK', payload: action.payload});
    }
  });

  socket.on('action', (action) => {
    if(action.type === 'server/DELETE_STOCK'){
      console.log('Called DELETE_STOCK!');
      socket.broadcast.emit('action', {type:'DELETE_STOCK', payload: action.payload});
    }
  });
});
