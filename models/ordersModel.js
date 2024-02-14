const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = { Order };