// import the model
const { Order } = require('../models/ordersModel');
const { OrderItem } = require('../models/orderItemsModel')
const { Product } = require('../models/productsModel');

const nodemailer = require('nodemailer');
const axios = require('axios');


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
        const orderId = req.params.id;

        // Delete all order items associated with the order
        await OrderItem.destroy({ where: { orderId } });

        // Delete the order itself
        await Order.destroy({ where: { order_id: orderId } });

        res.status(200).json({ message: 'Order and associated items deleted successfully' });
    } catch (error) {
        console.error('Error deleting order and associated items:', error);
        res.status(500).json({ error: 'An error occurred while deleting order and associated items' });
    }
};

//clear an order by id
exports.clearOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        // Delete all order items associated with the order
        await OrderItem.destroy({ where: { orderId } });
        res.status(200).json({ message: 'Order items deleted successfully' });

    } catch (error) {
        console.error('Error deleting order and associated items:', error);
        res.status(500).json({ error: 'An error occurred while deleting order and associated items' });
    }

};
//get total price of order
exports.getTotalPriceOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        // Find all order items associated with the order, including the Product details
        const orderItems = await OrderItem.findAll({
            where: { orderId },
            include: { model: Product }
        });

        // Calculate the total price by summing up the prices of all products in the order
        let totalPrice = 0;
        orderItems.forEach((orderItem) => {
            if (orderItem.Product) { // Check if the Product is defined
                totalPrice += parseFloat(orderItem.Product.price) * orderItem.quantity;
            }
        });

        res.status(200).json({ totalPrice });
    } catch (error) {
        console.error('Error getting total price of order:', error);
        res.status(500).json({ error: 'An error occurred while getting total price of order' });
    }
};

exports.sendOrderEmail = async (req, res) => {
    const { orderId, userDetails } = req.body;  // Expecting orderId and userDetails to be sent in the request body

    // Log userDetails to verify it is received correctly
    console.log('Received userDetails:', userDetails);

    try {
        // Fetch order details
        const response = await axios.get('http://localhost:8080/orderItems/withProductDetails/');
        const orderItems = response.data;

        // Filter the order items by the provided orderId
        const orderDetails = orderItems.filter(item => item.orderId === orderId);

        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'adolfo@ministryofcat.com',
            subject: 'New Order Received',
            text: `Order Details: ${JSON.stringify(orderDetails, null, 2)}\n\nUser Details: ${JSON.stringify(userDetails, null, 2)}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
};



