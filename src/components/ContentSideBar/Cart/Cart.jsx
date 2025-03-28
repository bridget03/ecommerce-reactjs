import styles from './styles.module.scss';
import { useContext } from 'react';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { PiShoppingCartLight } from 'react-icons/pi';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { SideBarContext } from '@contexts/SideBarProvider';
import LoadingCommon from '@components/LoadingCommon/LoadingCommon';
import { useNavigate } from 'react-router';

function Cart() {
  const navigate = useNavigate();
  const { listProductCart, isLoading, setIsOpen } = useContext(SideBarContext);
  const total = listProductCart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  const handleNavigateToShop = () => {
    navigate('/shop');
    setIsOpen(false);
  };
  const handleNavigateToCart = () => {
    setIsOpen(false);
    navigate('/cart');
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainCart}>
        <div className={styles.fixedHeader}>
          <HeaderSideBar icon={<PiShoppingCartLight />} title={'Cart'} />
        </div>

        {listProductCart.length ? (
          <div className={styles.containerCart}>
            <div className={styles.itemCart}>
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
              {isLoading && (
                <div className={styles.overlayLoading}>
                  <LoadingCommon />
                </div>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <div className={styles.subtotal}>
                Subtotal: ${total.toFixed(2)}
              </div>
              <div onClick={handleNavigateToCart}>
                <Button content={'VIEW CART'} />
              </div>
              <Button content={'CHECK OUT'} isPrimary={false} />
            </div>
          </div>
        ) : (
          <div className={styles.emptyBox}>
            <p>No product in your cart.</p>
            <div onClick={handleNavigateToShop}>
              <Button content={'Return to shop'} isPrimary={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
