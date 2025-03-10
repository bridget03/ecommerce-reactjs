import { useEffect, useState, createContext } from 'react';
import Cookies from 'js-cookie';

import { getInfo } from '@/apis/authService';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const handleLogOut = () => {
    Cookies.remove('userId');
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    setUserId(null);
    window.location.reload();
  };

  useEffect(() => {
    if (userId) {
      getInfo(userId)
        .then((res) => {
          setUserInfo(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  return (
    <StoreContext.Provider value={{ userInfo, setUserId, handleLogOut }}>
      {children}
    </StoreContext.Provider>
  );
};
