const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Review, {
  foreignKey: 'user_id',
});

Review.belongsTo(Book, {
  foreignKey: 'book_id',
});

Book.hasMany(Review, {
  foreignKey: 'book_id',
});

module.exports = { User, Book, Review };