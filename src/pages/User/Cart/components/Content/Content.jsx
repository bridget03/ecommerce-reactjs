import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';

import CartTable from './CartTable';
import CartTotal from './CartTotal';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useContext, useEffect } from 'react';
import { addProductToCart, deleteAll } from '@apis/cartService';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import { getCart } from '@/apis/cartService';

function Content() {
  const {
    listProductCart,
    handleGetListProductCart,
    isLoading,
    setIsLoading,
    userId,
  } = useContext(SideBarContext);
  const navigate = useNavigate();
  const handleNavigateToShop = () => {
    navigate('/shop');
  };

  const handleQuantityChange = (data) => {
    setIsLoading(true);
    addProductToCart(data)
      .then((res) => {
        handleGetListProductCart(data.userId, 'cart');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const handleClearAll = () => {
    setIsLoading(true);
    deleteAll({ userId })
      .then((res) => {
        handleGetListProductCart(userId, 'cart');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (userId) {
      getCart(userId)
        .then((res) => {
          setListProductCart(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setListProductCart([]);
          setIsLoading(false);
        });
    }
  }, []);
  return (
    <>
      {listProductCart.length > 0 && userId ? (
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
                  placeholder='Mã giảm giá'
                  className={styles.couponInput}
                />
                <div className={styles.okBtn}>
                  <Button content={'Ok'} isPrimary={false} />
                </div>
              </div>

              <div onClick={handleClearAll}>
                <Button content={'Xóa giỏ hàng'} isPrimary={false} />
              </div>
            </div>
          </div>
          <div className={styles.totalAndPayment}>
            <CartTotal productCart={listProductCart} isLoading={isLoading} />
          </div>
        </div>
      ) : (
        <div className={styles.boxEmptyCart}>
          <PiShoppingCartLight
            style={{
              fontSize: '50px',
            }}
          />
          <div className={styles.titleEmpty}>
            GIỎ HÀNG CỦA BẠN KHÔNG CÓ SẢN PHẨM NÀO
          </div>
          <div>
            Mời bạn đến với một số sản phẩm của cửa hàng. Chắc chắn bạn có thể
            tìm thấy điều gì đó cho bản thân!
          </div>
          <div className={styles.boxBtnEmpty} onClick={handleNavigateToShop}>
            <Button content={'TRỞ VỀ CỬA HÀNG'} />
          </div>
        </div>
      )}
    </>
  );
}

export default Content;
