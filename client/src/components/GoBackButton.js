import React from 'react'
import styles from './goBackButton.module.css'
import { Link } from 'react-router-dom';
    
export default function GoBackButton() {
    return (
        <div>
            <Link to={"/dashboard"} className={styles.productLink}>
            <div className={styles.goBackButton}><label class="arrow-icon"><i class="fa-solid fa-arrow-left"></i></label>
                <p className={styles.goBackButtonText}>Go back to shopping</p>
            </div>
            </Link>
        </div>
    )
}
