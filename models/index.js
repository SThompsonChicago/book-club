const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');
const Comment = require('./Comment');

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

Comment.belongsTo(Review, {
  foreignKey: 'review_id',
});

Review.hasMany(Comment, {
  foreignKey: 'review_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});


module.exports = { User, Book, Review, Comment };