// import axiosClient from './axiosClient';

// const getProduct = async (query) => {
//   const { sortType, page, limit } = query;
//   const queryLimit = limit === 'all' ? '' : `limit=${limit}`;
//   const res = await axiosClient.get(
//     `/product?sortType=${sortType}&page=${page}&${queryLimit}`
//   );
//   // const res = await axiosClient.get(`/product`);
//   return res.data;
// };

// const getDetailProduct = async (id) => {
//   const res = await axiosClient.get(`/product/${id}`);
//   return res.data;
// };
// const getRelatedProduct = async (id) => {
//   const res = await axiosClient.get(`/related-products/${id}`);
//   return res.data.relatedProducts;
// };
// export { getProduct, getDetailProduct, getRelatedProduct };

// src/api/productApi.js
import axiosClient from './axiosClient';

const getProduct = async ({ sortType, page, limit }) => {
  const params = new URLSearchParams();
  if (sortType) params.append('sortType', sortType);
  if (page) params.append('page', page);
  if (limit !== 'all') params.append('limit', limit);

  const res = await axiosClient.get(`/product?${params.toString()}`);
  return res.data;
};

const getDetailProduct = async (id) => {
  const res = await axiosClient.get(`/product/${id}`);
  return res.data;
};

const getRelatedProduct = async (id) => {
  const res = await axiosClient.get(`/related-products/${id}`);
  return res.data.relatedProducts;
};

export { getProduct, getDetailProduct, getRelatedProduct };
