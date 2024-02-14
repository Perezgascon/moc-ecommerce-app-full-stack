const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    picture_url: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: false
});


module.exports = { Product };
