// Load CONFIG globaly
require('dotenv').config();
require('./config');

// Require helper for utils direcory. You can require('_utils_/...') no mater deep you are
// using .paths file
require('sexy-require');

// Global functions
require('./global_functions');

const express      = require('express')
const favicon      = require('serve-favicon')
const bodyParser   = require('body-parser')
const path         = require('path')
const logger       = require("$utils/logger");

logger.info("Environment:", CONFIG.env)

// Database
const models = require("$models");
models.sequelize.authenticate().then(() => {
    logger.info('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
    logger.error('Unable to connect to SQL database:',CONFIG.db_name, err);
});
if(CONFIG.env==='development'){
    models.sequelize.sync();//creates table if they do not already exist
    //models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const auth = require('./routes/auth');
const v1 = require('./routes/v1');

// Logger
if (CONFIG.env === 'development') {
  app.use(require('morgan')('dev', { stream: logger.stream }));
}

// register routes
app.use('/auth', auth)
app.use('/api/v1', v1)

// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});  

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = CONFIG.env === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err);
});

module.exports = app


