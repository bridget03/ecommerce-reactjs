import styles from './styles.module.scss';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { PiShoppingCartLight } from 'react-icons/pi';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function Cart() {
  return (
    <div className={styles.container}>
      <div>
        <HeaderSideBar icon={<PiShoppingCartLight />} title={'Cart'} />
        <ItemProduct />
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.subtotal}>Subtotal: $120</div>
        <Button content={'VIEW WISHLIST'} />
        <Button content={'ADD ALL TO CART'} isPrimary={false} />
      </div>
    </div>
  );
}

export default Cart;
