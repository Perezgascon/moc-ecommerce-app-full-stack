const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
// const { Product } = require('./productsModel');
const { Order } = require('./ordersModel');


const OrderItem = sequelize.define('OrderItem', {
    order_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: false
});

Order.hasMany(OrderItem, {
    foreignKey: 'order_id'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'order_id'
});

module.exports = { OrderItem };