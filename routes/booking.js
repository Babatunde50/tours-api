const express = require('express');

const {
  getCheckoutSession,
  getAllBookings,
  getBookings,
  createBookings,
  deleteBookings,
  updateBookings
} = require('../controllers/booking');
const { protect, restrictTo } = require('../controllers/auth');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(getAllBookings)
  .post(createBookings);

router
  .route('/:id')
  .get(getBookings)
  .patch(updateBookings)
  .delete(deleteBookings);

module.exports = router;
