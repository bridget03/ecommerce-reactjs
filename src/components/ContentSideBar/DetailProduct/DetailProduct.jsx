import styles from './styles.module.scss';
import SelectBox from '@pages/User/OurShop/components/SelectBox';
import { SideBarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@/contexts/ToastProvider';

import Button from '@components/Button/Button.jsx';

import { IoIosGitCompare } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartLight } from 'react-icons/pi';
import {
  FaXTwitter,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaSkype,
} from 'react-icons/fa6';
import { useContext, useState } from 'react';

import { CiMail } from 'react-icons/ci';
import SlideCommon from '@components/SlideCommon/SlideCommon';
import Cookies from 'js-cookie';
import { addProductToCart } from '@apis/cartService';
import cls from 'classnames';
import { useNavigate } from 'react-router-dom';

function DetailProduct() {
  const { toast } = useContext(ToastContext);

  const {
    detailsProduct,
    userId,
    setType,
    handleGetListProductCart,
    setIsLoading,
    setIsOpen,
  } = useContext(SideBarContext);

  const [sizeSelected, setSizeSelected] = useState('');
  const [quantitySelected, setQuantitySelected] = useState('1');
  const navigate = useNavigate();
  const handleSelectSize = (size) => {
    setSizeSelected(size);
  };
  const handleClearSize = () => {
    setSizeSelected('');
  };
  const handleGetQuantityValue = (e) => setQuantitySelected(e);

  const handleAddToCart = () => {
    if (!userId) {
      toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      setIsOpen(true);
      setType('login');
      return;
    }
    setIsLoading(true);
    setIsOpen(false);
    if (!sizeSelected) {
      toast.warning('Vui lòng chọn kích thước sản phẩm');
    } else {
      addProductToCart({
        _id: detailsProduct._id,
        quantity: quantitySelected,
        size: sizeSelected,
      })
        .then((res) => {
          setIsOpen(true);
          setIsLoading(false);
          setType('cart');
          handleGetListProductCart(userId, 'cart');
          toast.success('Thêm sản phẩm vào giỏ hàng thành công');
        })
        .catch((error) => {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
          setIsLoading(true);
        });
    }
  };
  const handleBuyNow = () => {
    if (!userId) {
      setIsOpen(true);
      setType('login');
      toast.warning('Vui lòng đăng nhập để mua hàng');
      return;
    }
    setIsLoading(true);
    if (!sizeSelected) {
      toast.warning('Vui lòng chọn kích thước sản phẩm');
    } else {
      addProductToCart({
        _id: detailsProduct._id,
        quantity: quantitySelected,
        size: sizeSelected,
      })
        .then((res) => {
          setIsLoading(true);
          navigate('/cart');
          handleGetListProductCart(userId, 'cart');
          toast.success('Thêm sản phẩm vào giỏ hàng thành công');
          setIsOpen(false);
          setType('cart');
        })
        .catch((error) => {
          toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
          setIsLoading(true);
        });
    }
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <SlideCommon />
      </div>
      <div className={styles.name}>{detailsProduct.name}</div>
      <div className={styles.price}>${detailsProduct.price}</div>
      <div className={styles.description}>{detailsProduct.description}</div>
      <div className={styles.sizeGroup}>
        <p>Size {sizeSelected}</p>
        <div className={styles.size}>
          {detailsProduct.size.map((item) => {
            return (
              <div
                key={item.name}
                className={cls(styles.sizeItem, {
                  [styles.active]: sizeSelected === item.name,
                })}
                onClick={() => handleSelectSize(item.name)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        {sizeSelected && (
          <div className={styles.clear} onClick={handleClearSize}>
            clear
          </div>
        )}
      </div>
      <div className={styles.quantityAndAddToCart}>
        <div className={styles.quantity}>
          <SelectBox
            options={showOptions}
            type='show'
            value={quantitySelected}
            getValue={handleGetQuantityValue}
          />
        </div>
        {sizeSelected ? (
          <Button
            content={
              <div className={styles.btnContent} onClick={handleAddToCart}>
                <PiShoppingCartLight /> Thêm vào giỏ hàng
              </div>
            }
          />
        ) : (
          <Button
            className='cursor-not-allowed'
            content={
              <div className={styles.btnContent}>
                <PiShoppingCartLight /> Chọn size
              </div>
            }
          />
        )}
      </div>
      <div className={styles.or}>
        <span>OR</span>
      </div>
      <div className={styles.buyNow}>
        {sizeSelected ? (
          <div onClick={handleBuyNow}>
            <Button
              content={
                <div className={styles.btnContent}>
                  <PiShoppingCartLight />
                  <span>Mua ngay</span>
                </div>
              }
            />
          </div>
        ) : (
          <Button
            content={
              <div className={styles.btnContent}>
                <PiShoppingCartLight />
                <span>Chọn size</span>
              </div>
            }
          />
        )}
      </div>
      <div className={styles.iconGroup}>
        <div className={styles.icon}>
          <IoIosGitCompare style={{ fontSize: '20px' }} />
          <span>Thêm vào so sánh</span>
        </div>
        <div className={styles.icon}>
          <IoIosHeartEmpty style={{ fontSize: '20px' }} />
          <span>Thêm vào danh sách yêu thích</span>
        </div>
      </div>

      <div className={styles.productInfo}>
        <p>
          Dự kiến giao hàng: <span>5 - 7 ngày</span>
        </p>
        <p className={styles.socialMedia}>
          Chia sẻ:{' '}
          <span>
            <FaXTwitter />
            <FaFacebookF />
            <FaPinterestP />
            <FaLinkedinIn />
            <FaWhatsapp />
            <FaSkype />
            <CiMail />
          </span>
        </p>
      </div>
    </div>
  );
}

export default DetailProduct;
