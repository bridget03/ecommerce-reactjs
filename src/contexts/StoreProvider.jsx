// import { useEffect, useState, createContext } from 'react';
// import Cookies from 'js-cookie';

// import { getInfo } from '@/apis/authService';

// export const StoreContext = createContext();

// export const StoreProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [userId, setUserId] = useState(Cookies.get('userId'));
//   const handleLogOut = () => {
//     Cookies.remove('userId');
//     Cookies.remove('token');
//     Cookies.remove('refreshToken');
//     setId(null);
//     window.location.reload();
//   };

//   useEffect(() => {
//     if (userId) {
//       getInfo(userId)
//         .then((res) => {
//           setUserInfo(res.data);
//         })
//         .catch((err) => {
//           // console.log(err);
//         });
//     }
//   }, [userId]);

//   return (
//     <StoreContext.Provider value={{ userInfo, setUserId, handleLogOut }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

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
    setUserInfo(null);
    window.location.reload();
  };

  useEffect(() => {
    if (userId && !userInfo) {
      getInfo()
        .then((res) => {
          setUserInfo(res);
        })
        .catch((err) => {
          console.error('Lỗi khi lấy thông tin người dùng:', err);
          handleLogOut(); // Token lỗi → tự đăng xuất
        });
    }
  }, [userId, userInfo]);

  return (
    <StoreContext.Provider
      value={{ userInfo, setUserId, setUserInfo, handleLogOut }}
    >
      {children}
    </StoreContext.Provider>
  );
};
