import { useState, createContext, useEffect } from 'react';
import { getCart } from '@apis/cartService';
import Cookies from 'js-cookie';

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [listProductCart, setListProductCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = Cookies.get('userId');

  const handleGetListProductCart = (userId, type) => {
    setIsLoading(true);
    if (userId && type === 'cart') {
      getCart(userId)
        .then((res) => {
          setListProductCart(res.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setListProductCart([]);
          setIsLoading(false);
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
        isLoading,
        setIsLoading,
        userId,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
