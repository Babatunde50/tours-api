const Review = require('../models/reviews');
const Bookings = require('../models/bookings');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appErrors');

exports.getAllReviews = factory.getAll(Review);

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.id;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.isBooked = catchAsync(async (req, res, next) => {
  const booking = await Bookings.findOne({
    user: req.body.user,
    tour: req.body.tour
  });
  if (!booking) {
    return next(
      new AppError('You need to book a tour before you can review it', 400)
    );
  }
  next();
});

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
