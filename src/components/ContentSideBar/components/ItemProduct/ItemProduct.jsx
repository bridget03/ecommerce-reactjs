import styles from './styles.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
function ItemProduct() {
  return (
    <div className={styles.container}>
      <div className={styles.boxContainer}>
        <img
          src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-9.2-min.jpg'
          alt='#'
        />
        <div className={styles.closeIcon}>
          <IoCloseOutline style={{ fontSize: '18px' }} />
        </div>
        <div className={styles.boxContent}>
          {/* <div>
            <div className={styles.name}>Product name</div>
            <div className={styles.price}>$99.99</div>
          </div> */}
          <div>
            <div className={styles.name}>Product name</div>
            <div className={styles.size}>Size: M</div>
            <div className={styles.price}>1 * $99.99</div>
            <div className={styles.code}>SKU: 12349</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
