import styles from './styles.module.scss';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function LoadingCommon() {
  return (
    <div className={styles.loadMoreIcon}>
      <AiOutlineLoading3Quarters />
    </div>
  );
}

export default LoadingCommon;
