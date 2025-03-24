import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout.jsx';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import SelectBox from '@pages/OurShop/components/SelectBox';
import Button from '@components/Button/Button.jsx';

import { PiShoppingCartLight } from 'react-icons/pi';
import { IoIosGitCompare } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';

import visa from '@icons/paymentMethods/visa.jpeg';
import mastercard from '@icons/paymentMethods/master-card.jpeg';
import paypal from '@icons/paymentMethods/paypal.jpeg';
import amex from '@icons/paymentMethods/american-express.jpeg';
import maestro from '@icons/paymentMethods/maestro.jpeg';
import bitcoin from '@icons/paymentMethods/bitcoin.jpeg';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function DetailProduct() {
  const showOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ];

  const paymentMethods = [
    { src: visa, alt: 'Visa' },
    { src: mastercard, alt: 'Mastercard' },
    { src: paypal, alt: 'Paypal' },
    { src: amex, alt: 'American Express' },
    { src: maestro, alt: 'Maestro' },
    { src: bitcoin, alt: 'Bitcoin' },
  ];
  return (
    <div className={styles.container}>
      <Header />
      <MainLayout>
        <div className={styles.navigation}>
          <div className={styles.breadCrumb}>Home &gt; Men</div>
          <div className={styles.navigate}>&lt; Back to Previous Page</div>
        </div>
        <div className={styles.contentSection}>
          <div className={styles.imageGroup}>
            <div className={styles.Image}>
              <Zoom>
                <img
                  alt='That Wanaka Tree, New Zealand by Laura Smetsers'
                  src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                  width='400' // Giảm kích thước ban đầu để thấy rõ hiệu ứng zoom
                  height='auto'
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    cursor: 'zoom-in',
                  }} // Đảm bảo hiển thị tốt
                />
              </Zoom>
            </div>
            <div className={styles.Image}>
              <Zoom>
                <img
                  alt='That Wanaka Tree, New Zealand by Laura Smetsers'
                  src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                  width='500'
                />
              </Zoom>
            </div>
            <div className={styles.Image}>
              <Zoom>
                <img
                  alt='That Wanaka Tree, New Zealand by Laura Smetsers'
                  src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                  width='500'
                />
              </Zoom>
            </div>
            <div className={styles.Image}>
              <Zoom>
                <img
                  alt='That Wanaka Tree, New Zealand by Laura Smetsers'
                  src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
                  width='500'
                />
              </Zoom>
            </div>
          </div>
          <div className={styles.infoGroup}>
            <div className={styles.name}>10k Yellow Gold</div>
            <div className={styles.price}>$1,000.00</div>
            <div className={styles.description}>
              <p>
                This is a simple product. It is a product that is not
                configurable. This means that there is no need to select options
                for this product. It is a single product with a single price.
              </p>
            </div>
            <div className={styles.sizeGroup}>
              <p>
                Size <span className={styles.size}>M</span>
              </p>
              <div className={styles.sizeSelection}>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
              </div>
              <p className={styles.clear}>Clear</p>
            </div>
            <div className={styles.buttonGroup}>
              <div className={styles.quantityAndAddToCart}>
                <SelectBox
                  options={showOptions}
                  type='show'
                  // value={quantitySelected}
                  // getValue={handleGetQuantityValue}
                />
                <Button
                  content={
                    <div className={styles.btnContent}>
                      <PiShoppingCartLight /> ADD TO CART
                    </div>
                  }
                />
              </div>
              <div className={styles.or}>OR</div>
              <div className={styles.buyNow}>
                <Button
                  content={
                    <div className={styles.btnContent}>
                      <PiShoppingCartLight /> BUY NOW
                    </div>
                  }
                />
              </div>
              <div className={styles.actionBtn}>
                <div className={styles.icon}>
                  <IoIosHeartEmpty />
                </div>
                <div className={styles.icon}>
                  <IoIosGitCompare />
                </div>
              </div>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.textInfo}>
                Brand: <span className={styles.blurTextInfo}>Brand 01</span>
              </div>
              <div className={styles.textInfo}>
                SKU: <span className={styles.blurTextInfo}>123456</span>
              </div>
              <div className={styles.textInfo}>
                Category: <span className={styles.blurTextInfo}>Men</span>
              </div>
            </div>

            <div className={styles.safeCheckoutContainer}>
              <h4>
                GUARANTEED <span className={styles.safeText}>SAFE</span>{' '}
                CHECKOUT
              </h4>
              <div className={styles.paymentIcons}>
                {paymentMethods.map((method, index) => (
                  <div key={index} className={styles.paymentIcon}>
                    <span className={styles.tooltip}>
                      Pay safely with {method.alt}
                    </span>
                    <img src={method.src} alt={method.alt} />
                  </div>
                ))}
              </div>
              <p>
                Your Payment is <strong>100% Secure</strong>
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
      <Footer />
    </div>
  );
}

export default DetailProduct;
