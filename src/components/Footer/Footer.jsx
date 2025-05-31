import styles from './styles.module.scss';
import Logo from '@icons/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import {
  FaCcApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from 'react-icons/fa';

function Footer() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.logo}>
        <img
          src={Logo}
          alt='Logo'
          style={{ width: '200px', height: '80px', fill: 'white' }}
        />
      </div>
      <div className={styles.funcBtn}>
        <div className={styles.funcBtnItem}>
          <a href='/'>Trang chủ</a>
        </div>
        <div>
          <a href='#'>Element</a>
        </div>
        <div>
          <a href='/shop'>Cửa hàng</a>
        </div>
        <div>
          <a href='#'>Blog</a>
        </div>
        <div>
          <a href='/about-us'>Giới thiệu</a>
        </div>
        <div>
          <a href='#'>Liên hệ</a>
        </div>
        <div>
          <a href='#'>So sánh</a>
        </div>
      </div>
      <div className={styles.payMethod}>
        <p>Thanh toán an toàn</p>
        <div className={styles.icon}>
          <FaCcApplePay />
          <FaCcDiscover />
          <FaCcMastercard />
          <FaCcPaypal />
          <FaCcVisa />
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright 2025 SatoStore. Created by SatoStore</p>
      </div>
    </div>
  );
}

export default Footer;
