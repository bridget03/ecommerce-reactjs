import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import visa from '@icons/paymentMethods/visa.jpeg';
import mastercard from '@icons/paymentMethods/master-card.jpeg';
import paypal from '@icons/paymentMethods/paypal.jpeg';
import amex from '@icons/paymentMethods/american-express.jpeg';
import maestro from '@icons/paymentMethods/maestro.jpeg';
import bitcoin from '@icons/paymentMethods/bitcoin.jpeg';
import LoadingCart from '@pages/User/Cart/components/Loading';

import { SideBarContext } from '@/contexts/SideBarProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function CartTotal({ productCart, isLoading }) {
  const paymentMethods = [
    { src: visa, alt: 'Visa' },
    { src: mastercard, alt: 'Mastercard' },
    { src: paypal, alt: 'Paypal' },
    { src: amex, alt: 'American Express' },
    { src: maestro, alt: 'Maestro' },
    { src: bitcoin, alt: 'Bitcoin' },
  ];
  const { listProductCart } = useContext(SideBarContext);
  const total = listProductCart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const navigate = useNavigate();
  const handleBackToShop = () => {
    navigate('/shop');
  };
  return (
    <div className=''>
      <div className={styles.paymentContainer}>
        <div className={styles.totalContainer}>
          <div className={styles.title}>Tổng thanh toán</div>
          <div className={styles.line} />
          <div className={styles.subtotal}>
            <div className={styles.subtotalText}>Tổng</div>
            <div className={styles.subtotalValue}>
              {total.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
          <div className={styles.total}>
            <div className={styles.totalText}>Tổng</div>
            <div className={styles.totalValue}>
              {total.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
          <div className={styles.btnGroup}>
            <div onClick={() => navigate('/checkout')}>
              <Button content={'Tiến hành thanh toán'} isPrimary={true} />
            </div>
            <div onClick={handleBackToShop}>
              <Button content={'Tiếp tục mua hàng'} isPrimary={false} />
            </div>
          </div>
        </div>
        {isLoading && <LoadingCart />}
      </div>
      <div className={styles.safeCheckoutContainer}>
        <h4>
          Đảm bảo <span className={styles.safeText}>Bảo mật</span> khi thanh
          toán
        </h4>
        <div className={styles.paymentIcons}>
          {paymentMethods.map((method, index) => (
            <div key={index} className={styles.paymentIcon}>
              <span className={styles.tooltip}>
                Thanh toán an toàn với {method.alt}
              </span>
              <img src={method.src} alt={method.alt} />
            </div>
          ))}
        </div>
        <p>
          Thanh toán của bạn <strong>100% An toàn</strong>
        </p>
      </div>
    </div>
  );
}

export default CartTotal;
