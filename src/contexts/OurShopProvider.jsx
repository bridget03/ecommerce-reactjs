import { useState, createContext } from 'react';

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
  const sortOptions = [
    { label: 'Default sorting', value: '0' },
    { label: 'Sort by popularity', value: '1' },
    { label: 'Sort by average rating', value: '2' },
    { label: 'Sort by price: low to high', value: '3' },
    { label: 'Sort by price: high to low', value: '4' },
  ];
  const showOptions = [
    { label: '8', value: '8' },
    { label: '12', value: '12' },
    { label: 'All', value: 'all' },
  ];
  const [sortId, setSortId] = useState('0');
  const [showId, setShowId] = useState('8');
  const [isShowGrid, setIsShowGrid] = useState(true);
  const values = {
    sortOptions,
    showOptions,
    setSortId,
    setShowId,
    setIsShowGrid,
  };
  console.log('sort: ' + sortId);
  console.log('noshow: ' + showId);
  console.log('showType: ' + isShowGrid);
  return (
    <OurShopContext.Provider value={values}>{children}</OurShopContext.Provider>
  );
};
