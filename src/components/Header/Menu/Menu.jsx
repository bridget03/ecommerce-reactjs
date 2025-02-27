import styles from '../styles.module.scss';

import { useContext, useState } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/StoreProvider';
function Menu({ content, href }) {
  const { menu } = styles;
  const { setIsOpen, setType } = useContext(SideBarContext);
  const { userInfo, handleLogOut, setUserId } = useContext(StoreContext);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleShowLogin = (type) => {
    if (content === 'Sign in' && !userInfo) {
      setIsOpen(true);
      setType('login');
    }
  };
  const handleRenderText = (content) => {
    if (content === 'Sign in' && userInfo) {
      const userName = userInfo.username.split('@')[0];
      return `Hi ${userName}`;
    } else {
      return content;
    }
  };
  const handleHover = () => {
    console.log(content);
    if (content === 'Sign in' && userInfo) {
      setIsShowDropdown(true);
    }
  };
  return (
    <div className={menu} onMouseEnter={handleHover} onClick={handleShowLogin}>
      {handleRenderText(content)}
      {isShowDropdown && (
        <div
          className={styles.dropdownMenu}
          onMouseLeave={() => setIsShowDropdown(false)}
          onClick={() => handleLogOut()}
        >
          <p>Log Out</p>
        </div>
      )}
    </div>
  );
}

export default Menu;
