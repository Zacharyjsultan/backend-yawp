const pool = require('../utils/pool');

module.exports = class Review {
  id;
  user_id;
  restaurant_id;
  stars;
  description;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
    this.stars = row.stars;
    this.description = row.description;
  }

  static async insert({ userId, restaurantId, stars, description }) {
    const { rows } = await pool.query(
      `INSERT INTO reviews (user_id, restaurant_id, stars, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
      [userId, restaurantId, stars, description]
    );
    return new Review(rows[0]);
  }
};
