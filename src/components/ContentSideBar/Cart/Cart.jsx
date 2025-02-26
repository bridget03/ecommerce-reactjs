import styles from './styles.module.scss';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { PiShoppingCartLight } from 'react-icons/pi';

function Cart() {
  return (
    <div className={styles.container}>
      <HeaderSideBar icon={<PiShoppingCartLight />} title={'Cart'} />
    </div>
  );
}

export default Cart;
