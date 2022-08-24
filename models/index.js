const User = require('./User');
const Products = require('./Products');

User.hasMany(Products, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Products.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Products };
