const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  {
  "development": {
    "username": process.env.DB_user,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
)

module.exports = sequelize;
