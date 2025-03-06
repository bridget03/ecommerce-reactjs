import styles from './styles.module.scss';
import Item from './Item/Item';
import CartTotal from './CartTotal/CartTotal';

function Content() {
  return (
    <div className={styles.cartContainer}>
      <div className={styles.productListCart}>
        <Item />
      </div>
      <div className={styles.totalAndPayment}>
        <CartTotal />
      </div>
    </div>
  );
}

export default Content;
