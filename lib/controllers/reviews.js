const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Delete = require('../middleware/Delete');
const Review = require('../models/Review');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) next();
      res.json(review);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, Delete], async (req, res, next) => {
    try {
      const review = await Review.findById(req.params.id);
      const deleteReview = await Review.delete(review.id);
      res.json(deleteReview);
    } catch (e) {
      next(e);
    }
  });
