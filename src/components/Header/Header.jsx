import { useState, useEffect, useContext } from 'react';
import BoxIcon from './BoxIcon/BoxIcon';
import SearchModal from '@components/Modal/SearchModal';

import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.png';
import { IoIosGitCompare } from 'react-icons/io';

import { IoIosHeartEmpty } from 'react-icons/io';
import { PiShoppingCartLight } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import useScrollHandling from '@hooks/useScrollHandling';

import classNames from 'classnames';
import { SideBarContext } from '@/contexts/SideBarProvider';

import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const {
    containerBoxIcon,
    containerMenu,
    containerHeader,
    containerBox,
    container,
    topContainer,
    fixedHeader,
    mobileMenuIcon,
    mobileMenu,
  } = styles;

  const navigate = useNavigate();
  const { scrollPosition } = useScrollHandling();
  const [fixedPosition, setFixedPosition] = useState(false);
  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  const {
    isOpen,
    setIsOpen,
    setType,
    listProductCart,
    handleGetListProductCart,
  } = useContext(SideBarContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleOpenSideBar = (type) => {
    setIsOpen(true);
    setType(type);
  };

  const handleBackHomePage = () => {
    navigate('/');
  };

  const handleCloseModal = () => {
    setShowSearchModal(false);
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
            <RxHamburgerMenu
              className={mobileMenuIcon}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
            <div className={styles.socialIcon}>
              {dataBoxIcon.map((item) => {
                return <BoxIcon type={item.type} href={item.href} />;
              })}
            </div>
          </div>
          <div className={containerMenu}>
            {dataMenu.slice(0, 3).map((item) => {
              return <Menu content={item.content} href={item.href}></Menu>;
            })}
          </div>
        </div>
        <div className={styles.logo}>
          <img src={Logo} alt='Logo' onClick={handleBackHomePage} />
        </div>
        <div className={containerBox}>
          <div>
            <p
              className='cursor-pointer mr-4 text-[#333333]'
              onClick={handleSearchClick}
            >
              Tìm kiếm
            </p>
          </div>
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
            <div className={styles.cartIcon}>
              <PiShoppingCartLight
                className={styles.icon}
                onClick={() => handleOpenSideBar('cart')}
              />
              <div className={styles.cartCount}>
                {listProductCart.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchModal isOpen={showSearchModal} onClose={handleCloseModal} />

      {showMobileMenu && (
        <div className={mobileMenu}>
          <img
            src={Logo}
            alt='Logo'
            style={{ width: '200px', height: '80px' }}
          />
          <div className={styles.mobileMenuItem}>
            <Link to='/'>
              {' '}
              <div>Home</div>{' '}
            </Link>
            <Link to='/shop'>
              {' '}
              <div>Our Shop</div>{' '}
            </Link>
            <Link to='/about-us'>
              <div>About Us</div>
            </Link>
            <Link to='/about-us'>
              <div>Contact Us</div>
            </Link>
            <Link to='/my-account'>
              <div>Account</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
