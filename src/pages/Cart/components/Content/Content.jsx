import styles from './styles.module.scss';
import Item from './Item/Item';

function Content() {
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartInfo}>
        <div></div>
        <Item />
        <div></div>
      </div>
      <div className={styles.totalAndPayment}></div>
    </div>
  );
}

export default Content;
