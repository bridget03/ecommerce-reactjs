import styles from './styles.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { deleteItem } from '@/apis/cartService';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useContext, useState } from 'react';
import LoadingCommon from '@components/LoadingCommon/LoadingCommon';

function ItemProduct({
  srcProduct,
  nameProduct,
  quantity,
  priceProduct,
  sizeProduct,
  productId,
  userId,
}) {
  const [isDelete, setIsDelete] = useState(false);
  const { handleGetListProductCart } = useContext(SideBarContext);
  console.log('????????????', productId);

  const handleDeleteItem = () => {
    setIsDelete(true);

    deleteItem({ itemId: productId, sizeProduct })
      .then((res) => {
        setIsDelete(false);
        handleGetListProductCart(userId, 'cart');
      })
      .catch((err) => {
        console.log(err);
        setIsDelete(false);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.boxContainer}>
        <img src={srcProduct} alt='#' />
        <div className={styles.closeIcon} onClick={handleDeleteItem}>
          <IoCloseOutline style={{ fontSize: '18px' }} />
        </div>
        <div className={styles.boxContent}>
          <div>
            <div className={styles.name}>{nameProduct}</div>
            <div className={styles.size}>Size: {sizeProduct}</div>
            <div className={styles.price}>
              {quantity} * {priceProduct}
            </div>
          </div>
        </div>
        {isDelete && (
          <div className={styles.overlayLoading}>
            <LoadingCommon />
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemProduct;
