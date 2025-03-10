import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import visa from '@icons/paymentMethods/visa.jpeg';
import mastercard from '@icons/paymentMethods/master-card.jpeg';
import paypal from '@icons/paymentMethods/paypal.jpeg';
import amex from '@icons/paymentMethods/american-express.jpeg';
import maestro from '@icons/paymentMethods/maestro.jpeg';
import bitcoin from '@icons/paymentMethods/bitcoin.jpeg';
function CartTotal({ productCart }) {
  const paymentMethods = [
    { src: visa, alt: 'Visa' },
    { src: mastercard, alt: 'Mastercard' },
    { src: paypal, alt: 'Paypal' },
    { src: amex, alt: 'American Express' },
    { src: maestro, alt: 'Maestro' },
    { src: bitcoin, alt: 'Bitcoin' },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.paymentContainer}>
        <div className={styles.totalContainer}>
          <div className={styles.title}>Cart totals</div>
          <div className={styles.line} />
          <div className={styles.subtotal}>
            <div className={styles.subtotalText}>Subtotal</div>
            <div className={styles.subtotalValue}>$100 </div>
          </div>
          <div className={styles.total}>
            <div className={styles.totalText}>Total</div>
            <div className={styles.totalValue}>$100 </div>
          </div>
          <div className={styles.btnGroup}>
            <Button content={'PROCEED TO CHECKOUT'} isPrimary={true} />
            <Button content={'CONTINUE SHOPPING'} isPrimary={false} />
          </div>
        </div>
      </div>
      <div className={styles.safeCheckoutContainer}>
        <h4>
          GUARANTEED <span className={styles.safeText}>SAFE</span> CHECKOUT
        </h4>
        <div className={styles.paymentIcons}>
          {paymentMethods.map((method, index) => (
            <div key={index} className={styles.paymentIcon}>
              <span className={styles.tooltip}>
                Pay safely with {method.alt}
              </span>
              <img src={method.src} alt={method.alt} />
            </div>
          ))}
        </div>
        <p>
          Your Payment is <strong>100% Secure</strong>
        </p>
      </div>
    </div>
  );
}

export default CartTotal;
