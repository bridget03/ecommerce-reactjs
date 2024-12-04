import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';
import ProductItem from '@components/ProductItem/ProductItem.jsx';

function HeadlineListProduct() {
  const { container, containerItem } = styles;
  return (
    <MainLayout>
      <div className={container}>
        <div className={containerItem}>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </MainLayout>
  );
}

export default HeadlineListProduct;
