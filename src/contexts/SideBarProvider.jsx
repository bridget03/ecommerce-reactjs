import { useState, createContext, useEffect } from 'react';
import { getCart } from '@apis/cartService';
import Cookies from 'js-cookie';

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [listProductCart, setListProductCart] = useState([]);
  const userId = Cookies.get('userId');

  const handleGetListProductCart = (userId, type) => {
    if (userId && type === 'cart') {
      getCart(userId)
        .then((res) => {
          setListProductCart(res.data.data);
        })
        .catch((error) => {
          setListProductCart([]);
        });
    }
  };

  useEffect(() => {
    handleGetListProductCart(userId, 'cart');
  }, []);

  return (
    <SideBarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        type,
        setType,
        handleGetListProductCart,
        listProductCart,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
