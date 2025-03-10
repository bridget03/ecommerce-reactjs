import styles from './styles.module.scss';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';

import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import SelectBox from '@pages/OurShop/components/SelectBox';

function Filter() {
  const { sortOptions, showOptions, setSortId, setShowId, setIsShowGrid } =
    useContext(OurShopContext);
  const getValueSelect = (value, type) => {
    if (type === 'sort') {
      setSortId(value);
    } else {
      setShowId(value);
    }
  };
  const handleShowType = (type) => {
    setIsShowGrid(type === 'grid');
  };
  return (
    <div className={styles.optionContainer}>
      <div className={styles.leftOption}>
        <SelectBox
          className={styles.sortType}
          options={sortOptions}
          getValue={getValueSelect}
          type='sort'
        />

        <div className={styles.showType}>
          <BsFillGrid3X3GapFill
            className={styles.icon}
            onClick={() => handleShowType('grid')}
          />
          <div
            style={{ height: '20px', width: '1px', backgroundColor: '#e1e1e1' }}
          />
          <FaListUl
            className={styles.icon}
            onClick={() => handleShowType('list')}
          />
        </div>
      </div>
      <div className={styles.rightOption}>
        <div className={styles.showText} style={{ color: '#555555' }}>
          Show
        </div>

        <SelectBox
          className={styles.noShow}
          options={showOptions}
          getValue={getValueSelect}
          type='show'
        />
      </div>
    </div>
  );
}

export default Filter;
