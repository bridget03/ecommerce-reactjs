import React from 'react';
import styles from './styles.module.scss';

const CheckoutForm = () => {
  return (
    <form className={styles.form}>
      <h3 className={styles.title}>Billing Details</h3>

      <div className={styles.row}>
        <input
          className={styles.input}
          type='text'
          placeholder='First Name *'
        />
        <input className={styles.input} type='text' placeholder='Last Name *' />
      </div>

      <input
        className={styles.input}
        type='text'
        placeholder='Company Name (optional)'
      />
      <input
        className={styles.input}
        type='text'
        placeholder='Country / Region *'
      />
      <input
        className={styles.input}
        type='text'
        placeholder='Street address *'
      />
      <input
        className={styles.input}
        type='text'
        placeholder='Apartment, suite, unit, etc. (optional)'
      />
      <input className={styles.input} type='text' placeholder='Town / City *' />
      <input className={styles.input} type='text' placeholder='State *' />
      <input className={styles.input} type='text' placeholder='Phone *' />
      <input className={styles.input} type='text' placeholder='ZIP Code *' />
      <input
        className={styles.input}
        type='email'
        placeholder='Email Address *'
      />

      <textarea
        className={styles.textarea}
        placeholder='Order Notes (optional)'
      />
    </form>
  );
};

export default CheckoutForm;
