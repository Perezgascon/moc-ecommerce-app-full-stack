import React from 'react';
import styles from './productCard.module.css'

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <h3>{product.product_name}</h3>
      <p>{product.description}</p>
      <img src={product.picture_url} alt={product.product_name} />
      <p>Price: ${product.price}</p>
    </div>
  );
}

