const { sequelize } = require('./conn');
const { v4: uuidv4 } = require('uuid');

const { Order } = require('../models/ordersModel');
const { Product } = require('../models/productsModel');
const { User } = require('../models/usersModel');
const { OrderItem } = require('../models/orderItemsModel');
const { Category } = require('../models/categoriesModel');


const seedDatabase = async () => {
    try {
        // clear the database
        await sequelize.sync({ force: true });

        // sync the models
        await Product.sync({ force: true });

        // create a user
        const user = await User.create({
            user_id: uuidv4(),
            first_name: 'John',
            last_name: 'Doe',
            address: '123 Main St, New York, NY 10030',
            email: 'john@email.com',
        });
        // create categories
        const categories = await Category.bulkCreate([
            {
                categoryName: "Cat accesorries"
            },
            {
                categoryName: "Cat supplies"
            }
        ]);
        // create some starter products
        const products = await Product.bulkCreate([
            {
                product_name: 'Cat Collar',
                description: 'A stylish collar for your feline friend. Choose the colour you like.',
                picture_url: 'https://example.com/cat_collar.jpg',
                colors: ['Blue', 'Pink', 'Purple', 'Turquoise'],
                price: 4,
                category_name: "Cat accesorries",
                stock_quantity: 100
            },
            {
                product_name: 'Cat Litter Tray',
                description: 'A durable and spacious litter tray for your feline friend.',
                picture_url: 'https://example.com/cat_litter_tray.jpg',
                color: 'Assorted colors',
                price: 15,
                category_name: "Cat supplies",
                stock_quantity: 100
            },
            {
                product_name: 'Litter Scoop',
                description: 'Scoop up your cat\'s litter with ease using this handy tool.',
                picture_url: 'https://example.com/litter_scoop.jpg',
                color: 'Assorted colors',
                price: 2,
                category_name: "Cat supplies",
                stock_quantity: 100
            },
            {
                product_name: 'Cat Litter 10kg',
                description: 'High-quality cat litter that absorbs odors and keeps your home fresh.',
                picture_url: 'https://example.com/cat_litter.jpg',
                color: 'Assorted scents',
                price: 18,
                category_name: "Cat supplies",
                stock_quantity: 100
            },
            {
                product_name: 'Backpack Carrier Blue',
                description: 'Take your adventurous kitty on outdoor trips in style with this comfortable backpack carrier.',
                picture_url: 'https://example.com/backpack_carrier_blue.jpg',
                color: 'Blue',
                price: 25,
                category_name: "Cat supplies",
                stock_quantity: 100
            },
            // Add more products here...
        ]);

        // create a single order for the user
        const order = await Order.create({
            order_id: uuidv4(),
            user: user.user_id,
            order_date: new Date(),
            total_amount: 10 * 2 + 20 * 3 + 30 + 40 + 50, // Example calculation, adjust as needed
        });

        await OrderItem.bulkCreate([
            { orderItemId: uuidv4(), orderId: order.order_id, productId: products[0].product_id, quantity: 2 },
            { orderItemId: uuidv4(), orderId: order.order_id, productId: products[1].product_id, quantity: 3 },
            { orderItemId: uuidv4(), orderId: order.order_id, productId: products[2].product_id, quantity: 1 },
            { orderItemId: uuidv4(), orderId: order.order_id, productId: products[3].product_id, quantity: 1 },
            { orderItemId: uuidv4(), orderId: order.order_id, productId: products[4].product_id, quantity: 1 },
        ]);

        // Note: Add more products as needed for each category.


        console.log('Database seeded successfully!');
    } catch (error) {
        console.error(error);
    }
}

seedDatabase();
