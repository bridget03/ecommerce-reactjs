import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';
import ProductItem from '@components/ProductItem/ProductItem.jsx';

function HeadlineListProduct({ data }) {
  const { container, containerItem, productItem } = styles;

  console.log(data);
  return (
    <MainLayout>
      <div className={container}>
        <div className={containerItem}>
          {data.map((item) => {
            return (
              <ProductItem
                classNames={productItem}
                key={item.id}
                src={item.images[0]}
                prevSrc={item.images[1]}
                name={item.name}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}

export default HeadlineListProduct;
