import styles from './styles.module.scss';
import Logo from '@icons/images/logo.svg';

import {
  FaCcApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from 'react-icons/fa';

function Footer() {
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
          <a href='#'>Home</a>
        </div>
        <div>
          <a href='#'>Element</a>
        </div>
        <div>
          <a href='/shop'>Shop</a>
        </div>
        <div>
          <a href='#'>Blog</a>
        </div>
        <div>
          <a href='about-us'>About Us</a>
        </div>
        <div>
          <a href='#'>Contact Us</a>
        </div>
        <div>
          <a href='#'>Compare</a>
        </div>
      </div>
      <div className={styles.payMethod}>
        <p>Guaranteed safe checkout</p>
        <div className={styles.icon}>
          <FaCcApplePay />
          <FaCcDiscover />
          <FaCcMastercard />
          <FaCcPaypal />
          <FaCcVisa />
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright 2025 SatoStore. Created by me</p>
      </div>
    </div>
  );
}

export default Footer;
