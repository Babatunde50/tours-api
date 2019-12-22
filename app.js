const path = require('path');

const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appErrors');
const tourRoutes = require('./routes/tour');
const userRoutes = require('./routes/user');
const globalErrorHandler = require('./controllers/error');

const app = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
