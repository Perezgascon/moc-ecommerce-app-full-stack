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

    function handleAddToCart() {
        fetch(`http://localhost:8080/orders`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch user orders');
                return response.json();
            })
            .then(orders => {
                const userOrders = orders.filter(order => order.user);
                if (userOrders.length > 0) {
                    return userOrders[0];
                } else {
                    return fetch(`http://localhost:8080/orders`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({})
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to create new order');
                        return response.json();
                    });
                }
            })
            .then(order => {
                // Adjusted POST request URL to match expected endpoint format
                return fetch(`http://localhost:8080/orderItems/orders/${order.order_id}/add-item`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productId: product.product_id,
                        quantity: 1
                    })
                });
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add product to order');
                alert('Product added to shopping cart');
            })
            .catch(error => console.error('Error adding product to shopping cart:', error));
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
                <GreenButton message={"Add to shopping cart"} handleClick={handleAddToCart} />
            </div>
        </div>
    );
}

export default ProductPage;
