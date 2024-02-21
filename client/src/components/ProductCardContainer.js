import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductCardContainer({ selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`https://ministry-of-cat-shop.onrender.com/products?category=${selectedCategory}`);
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error(`Error fetching products for category ${selectedCategory}:`, error);
      }
    }

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  return (
    <div>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
