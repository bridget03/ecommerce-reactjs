import styles from './styles.module.scss';
import { useContext } from 'react';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { PiShoppingCartLight } from 'react-icons/pi';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { SideBarContext } from '@contexts/SideBarProvider';
import LoadingCommon from '@components/LoadingCommon/LoadingCommon';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

function Cart() {
  const userId = Cookies.get('userId');
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
  const handleNavigateCheckout = () => {
    console.log('Thanh toán');
    setIsOpen(false);
    navigate('/checkout');
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
                    srcProduct={product.image}
                    nameProduct={product.name}
                    quantity={product.quantity}
                    priceProduct={product.price}
                    sizeProduct={product.size}
                    productId={product._id}
                    userId={userId}
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
              <div className={styles.subtotal}>Tổng: {total.toFixed(2)}</div>
              <div onClick={handleNavigateToCart}>
                <Button content={'Xem giỏ hàng'} />
              </div>
              <div onClick={handleNavigateCheckout}>
                <Button content={'Đặt hàng'} isPrimary={false} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyBox}>
            <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
            <div onClick={handleNavigateToShop}>
              <Button content={'Trở về cửa hàng'} isPrimary={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
