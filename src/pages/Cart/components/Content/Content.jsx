import styles from './styles.module.scss';
import Item from './Item/Item';
import CartTotal from './CartTotal/CartTotal';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useContext } from 'react';

function Content() {
  const { listProductCart } = useContext(SideBarContext);
  console.log(listProductCart);
  return (
    <div className={styles.cartContainer}>
      <div className={styles.productListCart}>
        <Item productCart={listProductCart} />
      </div>
      <div className={styles.totalAndPayment}>
        <CartTotal />
      </div>
    </div>
  );
}

export default Content;
