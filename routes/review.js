const express = require('express');

const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview
} = require('../controllers/review');
const { restrictTo, protect } = require('../controllers/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllReviews);

router
  .route('/:id')
  .get(getReview)
  .post(restrictTo('user', 'admin'), setTourUserIds, createReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
