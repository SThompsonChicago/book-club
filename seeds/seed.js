const sequelize = require('../config/connection');
const { User } = require('../models');
const { Review } = require('../models');
const { Book } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const bookData = require('./bookData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Review.bulkCreate(reviewData);

  await Book.bulkCreate(bookData);

  process.exit(0);
};

seedDatabase();
