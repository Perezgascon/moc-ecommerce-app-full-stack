import React from 'react'
import styles from './clearCartButton.module.css'
import { Link } from 'react-router-dom';


export default function ClearCartButton() {
    return (
        <Link to={"/dashboard"} className={styles.productLink}>
            <div className={styles.clearButton}><label class="shopping-cart-icon"><i class="fa-solid fa-cart-shopping"></i></label>
                <p>Clear my cart</p>
            </div>
        </Link>
    )
}
