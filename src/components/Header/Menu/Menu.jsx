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
    if (content === 'Sign in' && userInfo) {
      return `Hi ${userInfo.username.split('@')[0]}`;
    }
    return content;
  };

  const handleShowLogin = () => {
    if (content === 'Sign in' && !userInfo) {
      setIsOpen(true);
      setType('login');
    }
    if (content === 'Our Shop') {
      navigate('/shop');
    }
  };

  const handleMouseEnter = () => {
    if (content === 'Sign in' && userInfo) {
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
      className={menu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleShowLogin}
    >
      {handleRenderText()}
      {isShowDropdown && (
        <div className={dropdownMenu} onClick={() => handleLogOut()}>
          <p>Log Out</p>
        </div>
      )}
    </div>
  );
}

export default Menu;
