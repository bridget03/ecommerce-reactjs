import { useState, createContext, useEffect } from 'react';
import { getProduct } from '@apis/productService';

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
  const sortOptions = [
    { label: 'Sắp xếp mặc định', value: '0' },
    { label: 'Sắp xếp theo mới nhất', value: '3' },
    { label: 'Sắp xếp theo giá: thấp đến cao', value: '4' },
    { label: 'Sắp xếp theo giá: cao đến thấp', value: '5' },
  ];
  const showOptions = [
    { label: '8', value: '8' },
    { label: '12', value: '12' },
    { label: 'Tất cả', value: 'all' },
  ];
  const [sortId, setSortId] = useState('0');
  const [showId, setShowId] = useState('8');
  const [isShowGrid, setIsShowGrid] = useState(true);
  const [products, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const handleLoadMore = () => {
    const query = {
      sortType: sortId,
      page: page + 1,
      limit: showId,
    };
    setIsLoadMore(true);
    getProduct(query)
      .then((res) => {
        setProduct((prevProducts) => [...prevProducts, ...res.data]);
        setPage(+res.page);
        setTotal(res.total);
        setIsLoadMore(false);
      })
      .catch((err) => {
        setIsLoadMore(false);
      });
  };
  const values = {
    sortOptions,
    showOptions,
    setSortId,
    setShowId,
    setIsShowGrid,
    products,
    isShowGrid,
    isLoading,
    handleLoadMore,
    total,
    isLoadMore,
  };

  useEffect(() => {
    const query = {
      sortType: sortId,
      page: 1,
      limit: showId,
    };
    setIsLoading(true);
    getProduct(query)
      .then((res) => {
        setProduct(res.data);
        setTotal(res.pagination.totalItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [sortId, showId]);
  return (
    <OurShopContext.Provider value={values}>{children}</OurShopContext.Provider>
  );
};
