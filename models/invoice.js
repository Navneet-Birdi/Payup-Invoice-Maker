const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Invoice extends Model {}

// MODEL FOR INVOICE
Invoice.init(
  {
    order_number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    in_stock: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    underscored: true,
    modelName: 'Invoice'
  }
);

module.exports = Invoice;
