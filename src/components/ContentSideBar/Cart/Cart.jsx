import styles from './styles.module.scss';
import { useContext } from 'react';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { PiShoppingCartLight } from 'react-icons/pi';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { SideBarContext } from '@contexts/SideBarProvider';

function Cart() {
  const { listProductCart } = useContext(SideBarContext);
  const total = listProductCart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);
  return (
    <div className={styles.container}>
      <div className={styles.mainCart}>
        <div className={styles.fixedHeader}>
          <HeaderSideBar icon={<PiShoppingCartLight />} title={'Cart'} />
        </div>

        {listProductCart.map((product, index) => {
          return (
            <ItemProduct
              srcProduct={product.images[0]}
              nameProduct={product.name}
              quantity={product.quantity}
              priceProduct={product.price}
              sizeProduct={product.size}
              codeProduct={product.sku}
              productId={product.productId}
              userId={product.userId}
            />
          );
        })}
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.subtotal}>Subtotal: ${total.toFixed(2)}</div>
        <Button content={'VIEW WISHLIST'} />
        <Button content={'ADD ALL TO CART'} isPrimary={false} />
      </div>
    </div>
  );
}

export default Cart;
