'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const expressSession = require('express-session');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');
const storageRouter = require('./routes/storage');
const subscriptionRouter = require('./routes/subscription');
const sessionConfig = require('./config/session');

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  })
);
app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(expressSession(sessionConfig));
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

app.use('/authentication', authenticationRouter);
app.use('/user', userRouter);
app.use('/storage', storageRouter);
app.use('/subscription', subscriptionRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
