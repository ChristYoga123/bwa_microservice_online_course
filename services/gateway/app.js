const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Middleware
const verifyToken = require('./middlewares/verifyToken');

// Route Register
const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');
const courseRouter = require('./routes/course');
const paymentRouter = require('./routes/payment');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route Implement
app.use('/', indexRouter);
app.use('/media', mediaRouter);
app.use('/course', verifyToken, courseRouter);
app.use('/payment', paymentRouter);
app.use('/order', orderRouter);
app.use('/users', userRouter);

module.exports = app;
