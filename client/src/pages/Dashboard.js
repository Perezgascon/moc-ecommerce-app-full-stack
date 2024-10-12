import React, { useState, useEffect } from 'react';
import CategoriesSideBar from '../components/CategoriesSideBar';
import ProductCardContainer from '../components/ProductCardContainer';
import ShoppingCartButton from '../components/ShoppingCartButton';
import AuthLinks from '../components/AuthLinks';

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProductsByCategory = async (categoryName) => {
    try {
      const response = await fetch(`http://localhost:8080/products/category/${categoryName}`);
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div>
      <AuthLinks />
      <ShoppingCartButton />
      <CategoriesSideBar onSelectCategory={handleCategorySelect} />
      <ProductCardContainer products={products} />
    </div>
  );
}
