import { IoIosGitCompare } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import cls from 'classnames';
import { useState, useContext, useEffect } from 'react';

import { OurShopContext } from '@contexts/OurShopProvider';
import { SideBarContext } from '@contexts/SideBarProvider';
import Cookies from 'js-cookie';
import { ToastContext } from '@/contexts/ToastProvider';

import { addProductToCart } from '@apis/cartService';
import LoadingCommon from '@components/LoadingCommon/LoadingCommon';
import MainLayout from '@components/Layout/Layout.jsx';
import { useNavigate } from 'react-router-dom';

function ProductItem({
  src,
  prevSrc,
  name,
  price,
  details,
  isHomepage = 'true',
  classNames = '',
}) {
  const { boxImg, showImgWhenHover, showFunctionWhenHover, boxIcon } = styles;
  const [activeSize, setActiveSize] = useState(null);
  const ourShopStore = useContext(OurShopContext);
  const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);

  const { setIsOpen, setType, handleGetListProductCart, setDetailsProduct } =
    useContext(SideBarContext);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const userId = Cookies.get('userId');
  const handleClearSize = () => {
    setActiveSize('');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!userId) {
      setIsOpen(true);
      setType('login');
      toast.warning('Please login before adding to cart');
      return;
    }

    if (!activeSize) {
      setIsLoading(true);
      toast.warning('Please choose size before adding to cart');
      setTimeout(() => setIsLoading(false), 3000);
      return;
    }

    setIsLoading(true);
    addProductToCart({ _id: details._id, quantity: 1, size: activeSize })
      .then(() => {
        setIsOpen(true);
        setType('cart');
        handleGetListProductCart(userId, 'cart');
        toast.success('Product added to cart successfully');
      })
      .catch(() => toast.error('Failed to add product to cart'));
    setIsLoading(false);
  };

  const handleShowDetailsProductSideBar = (e) => {
    e.stopPropagation();
    setDetailsProduct(details);
    setIsOpen(true);
    setType('details');
  };

  const handleShowDetailsPage = () => {
    const path = `/product/${details._id}`;

    navigate(path);
  };

  useEffect(() => {
    if (isHomepage) {
      setIsShowGrid(true);
    } else {
      setIsShowGrid(ourShopStore?.isShowGrid);
    }
  }, [isShowGrid, ourShopStore?.isShowGrid]);
  return (
    <div
      className={cls(styles.itemContainer, {
        [styles.container]: !isShowGrid,
      })}
    >
      <div className={boxImg} onClick={handleShowDetailsPage}>
        <img src={src} />
        <img src={prevSrc} className={showImgWhenHover} />
        <div className={showFunctionWhenHover}>
          <div className={boxIcon} onClick={handleAddToCart}>
            <LuShoppingCart style={{ fontSize: '20px' }} />
          </div>
          <div className={boxIcon}>
            <IoIosHeartEmpty style={{ fontSize: '20px' }} />
          </div>
          <div className={boxIcon}>
            <IoIosGitCompare style={{ fontSize: '20px' }} />
          </div>
          <div className={boxIcon} onClick={handleShowDetailsProductSideBar}>
            <IoEyeOutline style={{ fontSize: '20px' }} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {!isHomepage && (
          <div className={styles.sizeGroup}>
            {details.size.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cls(styles.size, {
                    [styles.active]: activeSize === item.name,
                  })}
                  onClick={() => setActiveSize(item.name)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
        {activeSize && (
          <div className={styles.btnClear} onClick={() => handleClearSize()}>
            clear
          </div>
        )}
        <div
          className={cls(styles.title, { [styles.textCenter]: !isHomepage })}
        >
          {name}
        </div>
        <div
          className={cls(styles.priceItem, {
            [styles.textCenter]: !isHomepage,
          })}
        >
          ${price}
        </div>
        {!isHomepage && (
          <div className={styles.buttonGroup} onClick={handleAddToCart}>
            <Button content={isLoading ? <LoadingCommon /> : 'ADD TO CART'} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
