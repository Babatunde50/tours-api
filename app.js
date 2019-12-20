const path = require('path');

const express = require('express');
const morgan = require('morgan');

const tourRoutes = require('./routes/tour');
const userRoutes = require('./routes/user');

const app = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;