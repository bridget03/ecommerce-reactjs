import styles from './styles.module.scss';

import { SideBarContext } from '@/contexts/SideBarProvider';
import classNames from 'classnames';
import { useContext } from 'react';

import { IoMdClose } from 'react-icons/io';
import Login from '@/components/ContentSideBar/Login/Login';
import Compare from '@/components/ContentSideBar/Compare/Compare';
import WishList from '@/components/ContentSideBar/WishList/WishList';
import Cart from '@/components/ContentSideBar/Cart/Cart';
import DetailProduct from '@components/ContentSideBar/DetailProduct/DetailProduct';

function SideBar() {
  const { isOpen, setIsOpen, type } = useContext(SideBarContext);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRenderContent = () => {
    switch (type) {
      case 'login':
        return <Login />;
      case 'compare':
        return <Compare />;
      case 'wishlist':
        return <WishList />;
      case 'cart':
        return <Cart />;
      case 'details':
        return <DetailProduct />;
      default:
        return <Login />;
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames({
          [styles.overlay]: isOpen,
        })}
        onClick={handleToggle}
      />
      <div
        className={classNames(styles.sideBar, {
          [styles.slideSideBar]: isOpen,
        })}
      >
        {handleRenderContent()}

        {isOpen && (
          <div className={styles.boxIcon} onClick={handleToggle}>
            <IoMdClose />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
