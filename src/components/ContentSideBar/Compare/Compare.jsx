import styles from './styles.module.scss';

import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import { IoIosGitCompare } from 'react-icons/io';

function Compare() {
  return (
    <div className={styles.container}>
      <HeaderSideBar icon={<IoIosGitCompare />} title={'Compare'} />
      <ItemProduct />
    </div>
  );
}

export default Compare;
