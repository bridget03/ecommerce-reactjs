import styles from './styles.module.scss';

import { SideBarContext } from '@/contexts/SideBarProvider';
import classNames from 'classnames';
import { useContext } from 'react';

import { IoMdClose } from 'react-icons/io';
import Login from '@/components/ContentSideBar/Login/Login';

function SideBar() {
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const handleToggle = () => {
    console.log('toggle');
    setIsOpen(!isOpen);
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
        <Login />
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
