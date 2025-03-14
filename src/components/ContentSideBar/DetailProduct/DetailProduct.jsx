import styles from './styles.module.scss';
import SelectBox from '@pages/OurShop/components/SelectBox';
import { SideBarContext } from '@contexts/SideBarProvider';

import Button from '@components/Button/Button.jsx';

import { IoIosGitCompare } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';
import {
  FaXTwitter,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaWhatsapp,
  FaSkype,
} from 'react-icons/fa6';
import { useContext } from 'react';

import { CiMail } from 'react-icons/ci';

function DetailProduct() {
  const { detailsProduct } = useContext(SideBarContext);
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
        <img src={detailsProduct.images[0]} />
      </div>
      <div className={styles.name}>{detailsProduct.name}</div>
      <div className={styles.price}>${detailsProduct.price}</div>
      <div className={styles.description}>{detailsProduct.description}</div>
      <div className={styles.sizeGroup}>
        <p>Size</p>
        <div className={styles.size}>
          {detailsProduct.size.map((item) => {
            return (
              <div key={item.name} className={styles.sizeItem}>
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.quantityAndAddToCart}>
        <div className={styles.quantity}>
          <SelectBox options={showOptions} type='show' />
        </div>
        <div>
          <Button content={'Add to Cart'} />
        </div>
      </div>
      <div className={styles.or}>
        <span>OR</span>
      </div>
      <div className={styles.buyNow}>
        <Button content={'BUY NOW'} />
      </div>
      <div className={styles.iconGroup}>
        <div className={styles.icon}>
          <IoIosGitCompare style={{ fontSize: '20px' }} />
          <span>Add to compare</span>
        </div>
        <div className={styles.icon}>
          <IoIosHeartEmpty style={{ fontSize: '20px' }} />
          <span>Add to wishlist</span>
        </div>
      </div>

      <div className={styles.productInfo}>
        <p>
          SKU: <span>12345</span>
        </p>
        <p>
          Category: <span>Men</span>
        </p>
        <p>
          Estimated delivery: <span>5 - 7 days</span>
        </p>
        <p className={styles.socialMedia}>
          Share:{' '}
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
