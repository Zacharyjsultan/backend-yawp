const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Review');
const authorize = require('../middleware/authorize');

module.exports = Router().delete(
  '/:id',
  [authenticate, authorize],
  async (req, res, next) => {
    try {
      const review = await Review.findById(req.params.id);
      if (review.userId !== req.user.id && req.user.email !== 'admin') {
        throw new Error('error');
      }
      const deleteReview = await Review.delete(review.id);
      res.json(deleteReview);
    } catch (e) {
      next(e);
    }
  }
);
