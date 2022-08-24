const sequelize = require('../config/connection.js')
const User = require('../models/user')
const Products = require('../models/products')
const userData = require('./userData.json');
const productData = require('./productData.json')
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Products.bulkCreate(productData, {
    returning: true,
  });

  process.exit(0);

};

seedDatabase();
