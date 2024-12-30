import reloadIcon from '@icons/svg/reloadIcon.svg';
import heartIcon from '@icons/svg/heartIcon.svg';
import cartIcon from '@icons/svg/cartIcon.svg';
import styles from './styles.module.scss';
function ProductItem({ src, prevSrc, name, price, classNames = '' }) {
  const {
    boxImg,
    showImgWhenHover,
    showFunctionWhenHover,
    boxIcon,
    title,
    priceItem,
  } = styles;
  return (
    <div className={`${classNames}`}>
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
      <div className={title}>{name}</div>
      <div className={priceItem}>${price}</div>
    </div>
  );
}

export default ProductItem;
