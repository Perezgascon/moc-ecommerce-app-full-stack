const { sequelize } = require('./conn');
// const { OrderItem } = require('../models/orderItemsModel');
// const { Order } = require('../models/ordersModel');
const { Product } = require('../models/productsModel');

const seedDatabase = async () => {
    try {
        // clear the database
        await sequelize.sync({ force: true });

        // sync the models
        await Product.sync({ force: true });

        // create some starter products
        const products = await Product.bulkCreate([
            {
                name: 'Cat Collar',
                description: 'A stylish collar for your feline friend. Choose the colour you like.',
                picture_url: 'https://example.com/cat_collar.jpg',
                colors: ['Blue', 'Pink', 'Purple', 'Turquoise'],
                price: 4,
                category: 'Pet Accessories',
                stock_quantity: 100
            },
            {
                name: 'Cat Bandana',
                description: 'Add some flair to your cat\'s style with these trendy bandanas. Choose the colour you like.',
                picture_url: 'https://example.com/cat_bandana.jpg',
                colors: ['Yellow', 'Avocado', 'Pink Strawberry', 'Dark Blue', 'Turquoise with triangles', 'Beige with ornaments'],
                price: 5,
                category: 'Pet Accessories',
                stock_quantity: 100
            },
            // Additional Cat Supplies
            {
                name: 'Cat Litter Tray',
                description: 'A durable and spacious litter tray for your feline friend.',
                picture_url: 'https://example.com/cat_litter_tray.jpg',
                color: 'Assorted colors',
                price: 15,
                category: 'Cat Supplies',
                stock_quantity: 100
            },
            {
                name: 'Litter Scoop',
                description: 'Scoop up your cat\'s litter with ease using this handy tool.',
                picture_url: 'https://example.com/litter_scoop.jpg',
                color: 'Assorted colors',
                price: 2,
                category: 'Cat Supplies',
                stock_quantity: 100
            },
            {
                name: 'Cat Litter 10kg',
                description: 'High-quality cat litter that absorbs odors and keeps your home fresh.',
                picture_url: 'https://example.com/cat_litter.jpg',
                color: 'Assorted scents',
                price: 18,
                category: 'Cat Supplies',
                stock_quantity: 100
            },
            {
                name: 'Backpack Carrier Blue',
                description: 'Take your adventurous kitty on outdoor trips in style with this comfortable backpack carrier.',
                picture_url: 'https://example.com/backpack_carrier_blue.jpg',
                color: 'Blue',
                price: 25,
                category: 'Cat Supplies',
                stock_quantity: 100
            },
            // Add more products here...
        ]);
        
        // Note: Add more products as needed for each category.
        

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error(error);
    }
}

seedDatabase();