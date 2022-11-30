const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (
      req.user &&
      (req.user.id === review.user_id || req.user.email === 'admin')
    ) {
      next();
    } else {
      throw new Error('Review ID does not match User ID');
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
