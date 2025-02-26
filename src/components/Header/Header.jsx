import { useState, useEffect, useContext } from 'react';
import BoxIcon from './BoxIcon/BoxIcon';

import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.png';
import { IoIosGitCompare } from 'react-icons/io';

import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartLight } from 'react-icons/pi';
import useScrollHandling from '@hooks/useScrollHandling';

import classNames from 'classnames';
import { SideBarContext } from '@/contexts/SideBarProvider';
function Header() {
  const {
    containerBoxIcon,
    containerMenu,
    containerHeader,
    containerBox,
    container,
    topContainer,
    fixedHeader,
  } = styles;

  const { scrollPosition } = useScrollHandling();
  const [fixedPosition, setFixedPosition] = useState(false);
  const { isOpen, setIsOpen, setType } = useContext(SideBarContext);

  const handleOpenSideBar = (type) => {
    setIsOpen(true);
    setType(type);
  };

  useEffect(() => {
    {
      scrollPosition >= 150 ? setFixedPosition(true) : setFixedPosition(false);
    }
  }, [scrollPosition]);
  return (
    <div
      className={classNames(container, topContainer, {
        [fixedHeader]: fixedPosition,
      })}
    >
      <div className={containerHeader}>
        <div className={containerBox}>
          <div className={containerBoxIcon}>
            {dataBoxIcon.map((item) => {
              return <BoxIcon type={item.type} href={item.href} />;
            })}
          </div>
          <div className={containerMenu}>
            {dataMenu.slice(0, 3).map((item) => {
              return <Menu content={item.content} href={item.href}></Menu>;
            })}
          </div>
        </div>
        <div>
          <img
            src={Logo}
            alt='Logo'
            style={{ marginTop: '10px', width: '190px', height: '150px' }}
          />
        </div>
        <div className={containerBox}>
          <div className={containerMenu}>
            {dataMenu.slice(3, dataMenu.length).map((item) => {
              return (
                <Menu
                  content={item.content}
                  href={item.href}
                  setIsOpen={setIsOpen}
                ></Menu>
              );
            })}
          </div>
          <div className={containerBoxIcon}>
            <IoIosGitCompare
              className={styles.icon}
              onClick={() => handleOpenSideBar('compare')}
            />
            <IoIosHeartEmpty
              className={styles.icon}
              onClick={() => handleOpenSideBar('wishlist')}
            />
            <PiShoppingCartLight
              className={styles.icon}
              onClick={() => handleOpenSideBar('cart')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
