import React from 'react'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <div>
            <div className={styles.footer}>
                <ul className={styles.footerLinks}>
                    <li>Faq</li>
                    <li>Condiments</li>
                    <li>Our Story</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
                <p className={styles.footerAttribution}>Website designed by Adolfo Perez-Gascon</p>

            </div>
        </div>
    )
}
