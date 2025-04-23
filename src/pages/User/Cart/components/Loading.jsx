import LoadingCommon from '@components/LoadingCommon/LoadingCommon';
import styles from './Content/styles.module.scss';

function LoadingCart() {
  const { loadingCart } = styles;
  return (
    <div className={loadingCart}>
      <LoadingCommon />
    </div>
  );
}

export default LoadingCart;
