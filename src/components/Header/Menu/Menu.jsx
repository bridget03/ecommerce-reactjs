import styles from '../styles.module.scss';

import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
function Menu({ content, href }) {
  const { menu } = styles;
  const { setIsOpen, setType } = useContext(SideBarContext);

  const handleShowLogin = (type) => {
    if (content === 'Sign in') {
      setIsOpen(true);
      setType('login');
    }
  };
  return (
    <div className={menu} onClick={handleShowLogin}>
      {content}
    </div>
  );
}

export default Menu;
