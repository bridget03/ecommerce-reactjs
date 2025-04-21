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

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { getDetailProduct, getRelatedProduct } from '@apis/productService';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductItem from '@components/ProductItem/ProductItem';
import { SideBarContext } from '@contexts/SideBarProvider';
import Cookies from 'js-cookie';
import { ToastContext } from '@/contexts/ToastProvider';
import { addProductToCart } from '@apis/cartService';

function DetailProduct() {
  const navigate = useNavigate();
  const param = useParams();
  console.log(param);
  const [data, setData] = useState();
  const [relatedData, setRelatedData] = useState();
  const { setIsOpen, setType, handleGetListProductCart, setDetailsProduct } =
    useContext(SideBarContext);

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

  const userId = Cookies.get('userId');
  const { toast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);

  const [sizeActive, setSizeActive] = useState();
  const [quantitySelected, setQuantitySelected] = useState('1');

  const handleSelectSize = (size) => {
    setSizeActive(size);
  };
  const handleClearSizeActive = () => {
    setSizeActive();
  };
  const handleGetQuantityValue = (e) => setQuantitySelected(e);
  const handleAddToCart = () => {
    if (!userId) {
      setIsOpen(true);
      setType('login');
      toast.warning('Please login before adding to cart');
      return;
    }
    setIsLoading(true);
    if (!sizeActive) {
      toast.warning('Please choose size before adding to cart');
    } else {
      addProductToCart({
        userId,
        productId: data._id,
        quantity: quantitySelected,
        size: sizeActive,
      })
        .then((res) => {
          setIsOpen(true);
          setType('cart');
          setIsLoading(true);
          handleGetListProductCart(userId, 'cart');
          toast.success('Product added to cart successfully');
        })
        .catch((error) => {
          toast.error('Failed to add product to cart');
          setIsLoading(true);
        });
    }
  };
  const handleBuyNow = () => {
    if (!userId) {
      setIsOpen(true);
      setType('login');
      toast.warning('Please login to buy');
      return;
    }
    setIsLoading(true);
    if (!sizeActive) {
      toast.warning('Please choose size before adding to cart');
    } else {
      addProductToCart({
        userId,
        productId: data._id,
        quantity: quantitySelected,
        size: sizeActive,
      })
        .then((res) => {
          setIsLoading(true);
          navigate('/cart');
          handleGetListProductCart(userId, 'cart');
          toast.success('Product added to cart successfully');
        })
        .catch((error) => {
          toast.error('Failed to add product to cart');
          setIsLoading(true);
        });
    }
  };

  const fetchDataDetail = async (id) => {
    try {
      const data = await getDetailProduct(id);
      setData(data);
    } catch (error) {
      setData();
      console.log(error);
    }
  };
  const fetchRelatedProduct = async (id) => {
    try {
      const relatedData = await getRelatedProduct(id);
      setRelatedData(relatedData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBackToShop = () => {
    navigate('/shop');
  };
  const handleBackToPrevious = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (param.id) {
      fetchDataDetail(param.id);
      fetchRelatedProduct(param.id);
    }
  }, [param]);
  console.log('Related: ' + relatedData);
  console.log('Detail data:' + data);
  return (
    <div className={styles.container}>
      <Header />
      <MainLayout>
        <div className={styles.navigation}>
          <div className={styles.breadCrumb}>
            <span
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </span>{' '}
            &gt; Men
          </div>
          <div className={styles.navigate} onClick={handleBackToPrevious}>
            &lt; Return to previous page
          </div>
        </div>

        {!data ? (
          <div className={styles.emptyData}>
            <p>No Result</p>
            <div onClick={handleBackToShop}>
              <Button content={'Back To Our Shop'} />
            </div>
          </div>
        ) : (
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
              <div className={styles.price}>${data?.price}</div>
              <div className={styles.description}>
                <p>{data?.description}</p>
              </div>
              <div className={styles.sizeGroup}>
                <p>
                  Size <span className={styles.size}>{sizeActive}</span>
                </p>
                <div className={styles.sizeSelection}>
                  {data?.size.map((item, index) => (
                    <button
                      key={index}
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
                    value={quantitySelected}
                    getValue={handleGetQuantityValue}
                  />
                  <div
                    className={cls(styles.btn, {
                      [styles.btnActive]: !sizeActive,
                    })}
                    onClick={handleAddToCart}
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
                  onClick={handleBuyNow}
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
                        <p className={styles.info}>
                          {data?.size.map((item) => {
                            return item.name + ' ';
                          })}
                        </p>
                      </div>
                      <div className={styles.additionalInfo}>
                        <p className={styles.title}>Material</p>
                        <p className={styles.info}>{data?.material}</p>
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
        )}

        <div className={styles.relatedProductsContainer}>
          <p className={styles.relatedProductsTitle}>YOU MIGHT ALSO LIKE</p>

          <div className={styles.swiperNavigation}>
            <div className={`${styles.swiperNavPrev} swiper-button-prev`}>
              <IoIosArrowBack />
            </div>
            <div className={`${styles.swiperNavNext} swiper-button-next`}>
              <IoIosArrowForward />
            </div>
          </div>

          <Swiper
            loop={true}
            modules={[Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className={styles.relatedProductsSwiper}
          >
            {relatedData?.map((item) => (
              <SwiperSlide key={item._id} className={styles.relatedProductItem}>
                <ProductItem
                  src={item.images[1]}
                  prevSrc={item.images[0]}
                  name={item.name}
                  price={item.price}
                  details={item}
                  isHomepage={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MainLayout>
      <Footer />
    </div>
  );
}

export default DetailProduct;
