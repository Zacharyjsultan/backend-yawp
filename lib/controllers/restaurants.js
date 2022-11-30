const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const restaurant = await Restaurant.getById(req.params.id);
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const restaurants = await Restaurant.getAll();
      res.json(restaurants);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id/reviews', [authenticate], async (req, res, next) => {
    try {
      const review = await Review.insert({
        userId: req.user.id,
        restaurantId: req.params.id,
        stars: req.body.stars,
        detail: req.body.detail,
      });
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
