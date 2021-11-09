const sequelize = require('../config/connection');
const { User, Review, Book } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Book.bulkCreate(bookData);

    await Review.bulkCreate(reviewData);

  } catch (err) {
    console.error(err);
  }

  process.exit(0);
};

seedDatabase();
