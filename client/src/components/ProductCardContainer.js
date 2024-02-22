import React from 'react';
import ProductCard from './ProductCard';
import styles from './productCardContainer.module.css'
import { Link } from 'react-router-dom';


export default function ProductCardContainer({ products }) {
  return (
    <div className={styles.productCardContainer}>
      {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}
