const express = require('express');

const {
  getAllTours,
  getTour,
  updateTour,
  createTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getTourWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
  getTourBookings
} = require('../controllers/tour');
const { protect, restrictTo } = require('../controllers/auth');
// const { createReview } = require('../controllers/review');
const reviewRouter = require('../routes/review');

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide'), getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/:unit').get(getTourWithin);
router.route('/distances/:latlng/unit/:unit', getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide', 'guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router.get('/:id/bookings', protect, getTourBookings);

module.exports = router;
