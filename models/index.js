const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');
//add Comment

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

//add user has many comment
//add comment belongs to user
//add comment belongs to review
//add review has many comment

module.exports = { User, Book, Review, Comment };