const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Route Register
const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');
const courseRouter = require('./routes/course');
const paymentRouter = require('./routes/payment');
const orderRouter = require('./routes/order');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route Implement
app.use('/', indexRouter);
app.use('/media', mediaRouter);
app.use('/course', courseRouter);
app.use('/payment', paymentRouter);
app.use('/order', orderRouter);

module.exports = app;
