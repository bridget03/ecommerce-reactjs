import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';

import CartTable from './CartTable';
import CartTotal from './CartTotal';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useContext } from 'react';
import { addProductToCart } from '@apis/cartService';

function Content() {
  const { listProductCart, handleGetListProductCart, isLoading } =
    useContext(SideBarContext);
  console.log(isLoading);
  const handleQuantityChange = (data) => {
    addProductToCart(data)
      .then((res) => {
        handleGetListProductCart(data.userId, 'cart');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.cartContainer}>
      <div className={styles.productListCart}>
        <CartTable
          productCart={listProductCart}
          getData={handleQuantityChange}
          isLoading={isLoading}
        />
        <div className={styles.cartActions}>
          <div className={styles.couponBox}>
            <input
              type='text'
              placeholder='Coupon code'
              className={styles.couponInput}
            />
            <div className={styles.okBtn}>
              <Button content={'OK'} isPrimary={false} />
            </div>
          </div>

          <div>
            <Button content={'🗑️ Clear Shopping Cart'} isPrimary={false} />
          </div>
        </div>
      </div>
      <div className={styles.totalAndPayment}>
        <CartTotal productCart={listProductCart} />
      </div>
    </div>
  );
}

export default Content;
