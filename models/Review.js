const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Review extends Model { }

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1,
        max: 5,
      },
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  },
);

module.exports = Review;