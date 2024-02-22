import React from 'react'
import styles from './paymentPage.module.css'

export default function PaymentPage() {
  return (
    <div className={styles.paymentMainContainer}>
      <h1>Choose Your Payment Method</h1>
      <div className={styles.paymentContainer}>
        <div className={styles.paymentOption}><label class="paypal-icon"><i
          class="fa-brands fa-cc-paypal payment-option-icon"></i></label></div>
        <div className={styles.paymentOption}><label class="stripe-icon"><i
          class="fa-brands fa-stripe payment-option-icon"></i></label></div>
        <div className={styles.paymentOption}><label class="cash-icon"><i
          class="fa-solid fa-money-bill-1-wave payment-option-icon"></i></label></div>
        <div className={styles.paymentOption}><label class="credit-card-icon"><i
          class="fa-solid fa-credit-card payment-option-icon"></i></label></div>
        <div className={styles.paymentOption}><img class="payment-option-icon" src="./assets/abalogo.png"></img></div>
      </div>
    </div>
  )
}
