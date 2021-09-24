require('dotenv').config();

const express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require('path');
const util = require('util');

const PORT = process.env.PORT || 3000;

var pliad = require('./plaid/plaid.js');

var index = require('./routes/index');
var verified = require('./routes/verified');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/verified', verified);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});