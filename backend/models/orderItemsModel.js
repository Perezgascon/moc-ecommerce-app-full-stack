const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
const { Product } = require('./productsModel');
const { Order } = require('./ordersModel');


const OrderItem = sequelize.define('orderItems', {
    orderItemId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: 'Order',
            key: 'order_id'
        }
    },
    // ForeignKey to Product
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Product',
            key: 'product_id'

        }

    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderItems',
    timestamps: false
});

// Order-Product relationship
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

// Optional: If you need direct access from Order to OrderItems or vice versa
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { OrderItem };