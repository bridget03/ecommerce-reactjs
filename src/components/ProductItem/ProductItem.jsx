import reloadIcon from '@icons/svg/reloadIcon.svg';
import heartIcon from '@icons/svg/heartIcon.svg';
import cartIcon from '@icons/svg/cartIcon.svg';
import styles from './styles.module.scss';
function ProductItem({ src, nextSrc, name, price }) {
  const {
    boxImg,
    showImgWhenHover,
    showFunctionWhenHover,
    boxIcon,
    title,
    priceItem,
  } = styles;
  return (
    <div>
      <div className={boxImg}>
        <img src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.2-min.jpg' />
        <img
          src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg'
          className={showImgWhenHover}
        />
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
      <div className={title}>10K Yellow Gold</div>
      <div className={priceItem}>9.99$</div>
    </div>
  );
}

export default ProductItem;
