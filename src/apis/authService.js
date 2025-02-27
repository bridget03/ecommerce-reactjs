import axiosClient from './axiosClient';

const register = async (body) => {
  //   console.log(body);
  return await axiosClient.post('/register', body);
};
const signIn = async (body) => {
  return await axiosClient.post('/login', body);
};

const getInfo = async () => {
  return await axiosClient.get(
    '/user/info/21c501ab-2725-4479-a912-2c04b097f5da'
  );
};

export { register, signIn, getInfo };
