import styles from './styles.module.scss';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import { IoIosGitCompare } from 'react-icons/io';
import Button from '@components/Button/Button';

function Compare() {
  return (
    <div className={styles.container}>
      <div>
        <HeaderSideBar icon={<IoIosGitCompare />} title={'Compare'} />
        <ItemProduct />
      </div>

      <div className={styles.buttonContainer}>
        <Button content={'VIEW COMPARE'} />
      </div>
    </div>
  );
}

export default Compare;
