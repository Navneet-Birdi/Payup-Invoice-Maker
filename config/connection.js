const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  {
   "use_env_variable": "JAWSDB_URL",
    dialect: "mysql"
  })

module.exports = sequelize;
