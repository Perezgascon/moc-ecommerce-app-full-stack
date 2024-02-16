// import the model
const { Order } = require('../models/ordersModel');

// get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get a order by id
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json(order);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// create a new order
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update an order by id
exports.updateOrderById = async (req, res) => {
    try {
        const order = await Order.update(req.body, {
            where: {
                order_id: req.params.id
            }
        });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json(order);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete an order by id
exports.deleteOrderById = async (req, res) => {
    try {
        const order = await Order.destroy({
            where: {
                order_id: req.params.id
            }
        });
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json({ message: 'Order deleted' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
