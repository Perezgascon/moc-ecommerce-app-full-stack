import React from 'react'
import styles from './shoppingCartButton.module.css'
import { Link } from 'react-router-dom'; // Import Link


export default function ShoppingCartButton() {
  return (
    <div>
      <Link to={"/checkout"} className={styles.productLink}>
        <div className={styles.shoppingCart}>
          <div className={styles.shoppingCartIcon}><i className="fa-solid fa-cart-shopping"></i></div>
          {/* <div><span className={styles.shoppingCartItemCounter}>{itemCount}</span> items</div>
      <div>$<span className={styles.shoppingCartPrice}>{totalPrice}</span></div> */}
        </div>
      </Link>
    </div>
  )
}
