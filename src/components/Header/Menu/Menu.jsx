import styles from '../styles.module.scss';

import { useContext, useState, useEffect } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/StoreProvider';
import { useNavigate } from 'react-router-dom';

function Menu({ content }) {
  const { menu, dropdownMenu } = styles;
  const { setIsOpen, setType } = useContext(SideBarContext);
  const { userInfo, setUserId, handleLogOut } = useContext(StoreContext);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleRenderText = () => {
    if (content === 'Đăng nhập' && userInfo?.data.user.email) {
      return `Hi ${userInfo.data.user.email.split('@')[0]}`;
    }
    return content;
  };

  const handleShowLogin = () => {
    if (content === 'Đăng nhập' && !userInfo) {
      setIsOpen(true);
      setType('login');
    }
    if (content === 'Cửa hàng') {
      navigate('/shop');
    }
    if (content === 'Về chúng tôi') {
      navigate('/about-us');
    }
    if (content === 'Contacts ') {
      navigate('/contact');
    }
  };

  const handleMouseEnter = () => {
    if (content === 'Đăng nhập' && userInfo) {
      setIsShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    setIsShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${menu}`) &&
        !event.target.closest(`.${dropdownMenu}`)
      ) {
        setIsShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={styles.menu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleShowLogin}
    >
      {handleRenderText()}
      {isShowDropdown && (
        <div>
          <div className={styles.dropdownMenu}>
            <div onClick={() => handleLogOut()}>
              <p>Đăng xuất</p>
            </div>
          </div>
          <div className={styles.dropdownMenu2}>
            <div>
              <p>Tài khoản</p>
            </div>
          </div>
          <div
            className={styles.dropdownMenu3}
            onClick={() => navigate('/my-order')}
          >
            <div>
              <p>Đơn hàng</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
