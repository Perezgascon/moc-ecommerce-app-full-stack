import React from 'react'
import styles from './cashPaymentPage.module.css'


export default function AbaPaymentPage() {
  return (
    <div className={styles.paymentsMainContainer}>
      <h1 className={styles.h1}>Cash Payment</h1>
      <p className={styles.p}>Your order will be on its way shortly.</p>
      <p className={styles.p}>If it is </p>
      <h2 className={styles.h2}>Pay in USD</h2>
      <img src={abaqrcodeusd} className={styles.qrCode} />
      <h2 className={styles.h2}>Pay in Riel</h2>
      <img src={abaqrcodekhr} className={styles.qrCode} />

    </div>
  )
}
