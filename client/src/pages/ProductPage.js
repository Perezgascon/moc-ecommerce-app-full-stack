import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import GoBackButton from '../components/GoBackButton';
import ShoppingCartButton from '../components/ShoppingCartButton';
import GreenButton from '../components/GreenButton';
import styles from './productPage.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const ProductPage = () => {
    const { productId } = useParams(); // Use the useParams hook to get the productId
    const navigate = useNavigate(); // Use the useNavigate hook to navigate programmatically
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();

        // Clean-up function (optional)
        return () => {
            // Any clean-up code goes here
        };
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    function handleClick() {
        // Step 1: Check if an order exists for the current user
        fetch(`http://localhost:8080/orders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user order');
                }
                return response.json();
            })
            .then(orders => {
                // Find the order for the current user
                const userOrder = orders.find(order => order.user === 'YOUR_AUTH_TOKEN');
                if (!userOrder) {
                    // If no order exists, create a new order
                    return fetch(`http://localhost:8080/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: 'YOUR_AUTH_TOKEN' // Include the user ID or authentication token
                        })
                    });
                }
                return userOrder; // Return the existing order
            })
            .then(response => response.json())
            .then(order => {
                // Step 2: Add the selected product to the order as an order item
                return fetch(`http://localhost:8080/orderItems`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        orderId: order.order_id, // Use the order ID from the previous step
                        productId: product.product_id, // Use the product ID of the selected product
                        quantity: 1 // You may allow the user to specify the quantity
                    })
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product to order');
                }
                alert('Product added to shopping cart');
                // Optionally, you can redirect the user to the shopping cart page or display a success message
                navigate('/checkout');
            })
            .catch(error => {
                console.error('Error adding product to shopping cart:', error);
                // Handle errors (e.g., display an error message to the user)
            });
    }



    return (
        <div>
            <GoBackButton />
            <ShoppingCartButton />
            <div className={styles.productMainContainer}>
                <h1 className={styles.productName}>{product.product_name}</h1>
                <img className={styles.productImage} src={product.picture_url} alt={product.product_name} />
                <div className={styles.productColors}>
                    {/* Product colors content */}
                </div>
                <div className={styles.productDescription}>{product.description}</div>
                <GreenButton message={"Add to shopping cart"} handleClick={handleClick} />
            </div>
        </div>
    );
}

export default ProductPage;
