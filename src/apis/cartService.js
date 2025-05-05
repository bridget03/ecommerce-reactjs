// src/apis/cartApi.js
import axiosClient from '@/apis/axiosClient';

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {Object} data - { _id, quantity, size }
 */
const addProductToCart = async (data) => {
  try {
    const res = await axiosClient.post('/cart', data);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**
 * Lấy danh sách sản phẩm trong giỏ hàng của user
 * @param {String} userId
 */
const getCart = async (userId) => {
  try {
    const res = await axiosClient.get(`/cart/${userId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**
 * Xóa một sản phẩm ra khỏi giỏ hàng
 * @param {Object} data - { _id, size }
 */
const deleteItem = async (data) => {
  try {
    const res = await axiosClient.delete('/cart/deleteItem', { data });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**
 * Xóa toàn bộ sản phẩm trong giỏ hàng của user
 * @param {Object} data - { userId }
 */
const deleteAll = async (data) => {
  try {
    const res = await axiosClient.delete('/cart/delete', { data });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export { addProductToCart, getCart, deleteItem, deleteAll };
