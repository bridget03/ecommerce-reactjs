import MainLayout from '@components/Layout/Layout.jsx';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import ProductItem from '@components/ProductItem/ProductItem';
import styles from './styles.module.scss';
import cls from 'classnames';
import Button from '@components/Button/Button.jsx';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import LoadingCommon from '@components/LoadingCommon/LoadingCommon';

function ListProduct() {
  const { products, isShowGrid, isLoading, handleLoadMore, total, isLoadMore } =
    useContext(OurShopContext);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MainLayout>
          {' '}
          <div
            className={cls(styles.productContainerList, {
              [styles.productContainer]: isShowGrid,
            })}
          >
            {products.map((product) => (
              <ProductItem
                key={product.id}
                src={product.images[0]}
                prevSrc={product.images[1]}
                name={product.name}
                price={product.price}
                details={product}
                isHomepage={false}
              />
            ))}
          </div>
          {products.length < total && (
            <div
              onClick={() => {
                handleLoadMore();
              }}
              className={styles.loadMore}
            >
              <Button
                content={isLoadMore ? <LoadingCommon /> : 'Tải thêm sản phẩm'}
              />
            </div>
          )}
        </MainLayout>
      )}
    </>
  );
}

export default ListProduct;
