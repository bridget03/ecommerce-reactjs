import axiosClient from './axiosClient';
import Cookies from 'js-cookie';

const register = async (body) => {
  return await axiosClient.post('/auth/register', body);
};

const signIn = async (body) => {
  const response = await axiosClient.post('/auth/login', body);
  const token = response.data.token;

  if (token) {
    Cookies.set('token', token, { expires: 7 }); // Lưu cookie 7 ngày
  }

  return response;
};

const getInfo = async () => {
  return await axiosClient.get('/auth/me'); // Token được gắn tự động qua axiosClient
};

export { register, signIn, getInfo };
