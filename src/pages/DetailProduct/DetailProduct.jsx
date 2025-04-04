import styles from './styles.module.scss';
import MainLayout from '@components/Layout/Layout.jsx';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import SelectBox from '@pages/OurShop/components/SelectBox';
import Button from '@components/Button/Button.jsx';
import cls from 'classnames';

import { PiShoppingCartLight } from 'react-icons/pi';
import {
  IoIosGitCompare,
  IoIosHeartEmpty,
  IoIosReturnLeft,
} from 'react-icons/io';
import { CiDeliveryTruck } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';

import visa from '@icons/paymentMethods/visa.jpeg';
import mastercard from '@icons/paymentMethods/master-card.jpeg';
import paypal from '@icons/paymentMethods/paypal.jpeg';
import amex from '@icons/paymentMethods/american-express.jpeg';
import maestro from '@icons/paymentMethods/maestro.jpeg';
import bitcoin from '@icons/paymentMethods/bitcoin.jpeg';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import { getDetailProduct } from '@apis/productService';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailProduct() {
  const param = useParams();
  console.log(param);
  const [data, setData] = useState();
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

  const [sizeActive, setSizeActive] = useState();
  const handleSelectSize = (size) => {
    setSizeActive(size);
  };
  const handleClearSizeActive = () => {
    setSizeActive();
  };

  const fetchDataDetail = async (id) => {
    try {
      const data = await getDetailProduct(id);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (param.id) {
      fetchDataDetail(param.id);
    }
  }, [param]);
  console.log(data);
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
            {data?.images.map((src) => {
              return (
                <div className={styles.Image}>
                  <Zoom>
                    <img
                      alt={data?.name}
                      src={src}
                      width='500'
                      style={{
                        display: 'block',
                        margin: '0 auto',
                        cursor: 'zoom-in',
                      }}
                    />
                  </Zoom>
                </div>
              );
            })}
          </div>
          <div className={styles.infoGroup}>
            <div className={styles.name}>{data?.name}</div>
            <div className={styles.price}>{data?.price}</div>
            <div className={styles.description}>
              <p>{data?.description}</p>
            </div>
            <div className={styles.sizeGroup}>
              <p>
                Size <span className={styles.size}>{sizeActive}</span>
              </p>
              <div className={styles.sizeSelection}>
                {data?.size.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelectSize(item.name)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <p className={styles.clear} onClick={handleClearSizeActive}>
                Clear
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <div className={styles.quantityAndAddToCart}>
                <SelectBox
                  options={showOptions}
                  type='show'
                  // value={quantitySelected}
                  // getValue={handleGetQuantityValue}
                />
                <div
                  className={cls(styles.btn, {
                    [styles.btnActive]: !sizeActive,
                  })}
                >
                  <Button
                    content={
                      <div className={styles.btnContent}>
                        <PiShoppingCartLight /> ADD TO CART
                      </div>
                    }
                  />
                </div>
              </div>
              <div className={styles.or}>OR</div>
              <div
                className={cls(styles.btn, {
                  [styles.btnActive]: !sizeActive,
                })}
              >
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
            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}>
                <div className={styles.icon}>
                  <CiDeliveryTruck />
                </div>
                <div className={styles.text}>Orders over $50 ship free</div>
              </div>
              <div className={styles.deliveryItem}>
                <div className={styles.icon}>
                  <IoIosReturnLeft />
                </div>
                <div className={styles.text}>30 days returns</div>
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
            <div className={styles.accordionContainer}>
              <Accordion allowZeroExpanded>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className={styles.accordionBtn}>
                      <span>
                        <IoIosArrowDown />
                      </span>
                      ADDITIONAL INFORMATION
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className={styles.additionalInfo}>
                      <p className={styles.title}>Size</p>
                      <p className={styles.info}>M, L, XL</p>
                    </div>
                    <div className={styles.additionalInfo}>
                      <p className={styles.title}>Material</p>
                      <p className={styles.info}>Fleece</p>
                    </div>
                    <div className={styles.additionalInfo}>
                      <p className={styles.title}>Color</p>
                      <p className={styles.info}>Black, Blue</p>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton className={styles.accordionBtn}>
                      <span>
                        <IoIosArrowDown />
                      </span>
                      Hướng dẫn sử dụng
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>Vui lòng đọc kỹ hướng dẫn trước khi dùng.</p>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
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
