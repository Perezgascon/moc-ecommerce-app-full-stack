const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
const { User } = require('./usersModel');
// const { Product } = require('./productsModel');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
    total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
});

// Associations
User.hasMany(Order, { foreignKey: 'user' });
Order.belongsTo(User, { foreignKey: 'user' });

module.exports = { Order };