import reloadIcon from '@icons/svg/reloadIcon.svg';
import heartIcon from '@icons/svg/heartIcon.svg';
import cartIcon from '@icons/svg/cartIcon.svg';
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

  const { setIsOpen, setType, handleGetListProductCart } =
    useContext(SideBarContext);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useContext(ToastContext);

  const userId = Cookies.get('userId');
  const handleClearSize = () => {
    setActiveSize('');
  };
  const handleAddToCart = () => {
    if (!userId) {
      setIsOpen(true);
      setType('login');
      toast.warning('Please login before adding to cart');
      return;
    }

    setIsLoading(true);
    if (!activeSize) {
      toast.warning('Please choose size before adding to cart');
    } else {
      addProductToCart({
        userId,
        productId: details._id,
        quantity: 1,
        size: activeSize,
      })
        .then((res) => {
          setIsOpen(true);
          setIsLoading(false);
          setType('cart');
          handleGetListProductCart(userId, 'cart');
          toast.success('Product added to cart successfully');
        })
        .catch((error) => {
          toast.error('Failed to add product to cart');
          setIsLoading(true);
        });
    }
  };

  useEffect(() => {
    if (isHomepage) {
      setIsShowGrid(true);
    } else {
      setIsShowGrid(ourShopStore?.isShowGrid);
    }
  }, [isShowGrid, ourShopStore?.isShowGrid]);
  return (
    <div className={cls({ [styles.container]: !isShowGrid })}>
      <div className={boxImg}>
        <img src={src} />
        <img src={prevSrc} className={showImgWhenHover} />
        <div className={showFunctionWhenHover}>
          <div className={boxIcon}>
            <img src={cartIcon} alt='cartIcon' />
          </div>
          <div className={boxIcon}>
            <img src={heartIcon} alt='heartIcon' />
          </div>
          <div className={boxIcon}>
            <img src={reloadIcon} alt='reloadIcon' />
          </div>
          <div className={boxIcon}>
            <img src={cartIcon} alt='cartIcon' />
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
