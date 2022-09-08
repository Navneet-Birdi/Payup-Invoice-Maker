const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'jbb8y3dri1ywovy2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
  },

 {
   "mysqlOptions": {
     "authProtocol": "default"
   },
   "previewLimit": 50,
   "server": "localhost",
   "port": 3306,
   "driver": "MySQL",
   "name": "payup_connection",
   "database": "payup_db",
   "username": "root",
   "password": "root"
})

module.exports = sequelize;
