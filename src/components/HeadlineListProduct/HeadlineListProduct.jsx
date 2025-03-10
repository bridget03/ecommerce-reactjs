import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';
import ProductItem from '@components/ProductItem/ProductItem.jsx';
import CountDownBanner from '@components/CountDownBanner/CountDownBanner.jsx';

import { useContext } from 'react';

function HeadlineListProduct({ data }) {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.containerItem1}>
          <CountDownBanner />
        </div>
        <div className={styles.containerItem2}>
          {data.slice(0, 2).map((item) => (
            <ProductItem
              classNames={styles.productItem}
              key={item.id}
              src={item.images[0]}
              prevSrc={item.images[1]}
              name={item.name}
              price={item.price}
              details={item}
            />
          ))}
        </div>
      </div>

      <div className={styles.productContainer}>
        {data.slice(2, 10).map((item) => {
          return (
            <ProductItem
              classNames={styles.productItem}
              key={item.id}
              src={item.images[0]}
              prevSrc={item.images[1]}
              name={item.name}
              price={item.price}
              details={item}
            />
          );
        })}
      </div>
    </MainLayout>
  );
}

export default HeadlineListProduct;
