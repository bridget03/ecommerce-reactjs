import styles from './styles.module.scss';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { IoIosHeartEmpty } from 'react-icons/io';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function WishList() {
  return (
    <div className={styles.container}>
      <div>
        <HeaderSideBar icon={<IoIosHeartEmpty />} title={'Wish list'} />
        <ItemProduct />
      </div>
      <div className={styles.buttonContainer}>
        <Button content={'VIEW WISHLIST'} />
        <Button content={'ADD ALL TO CART'} isPrimary={false} />
      </div>
    </div>
  );
}

export default WishList;
