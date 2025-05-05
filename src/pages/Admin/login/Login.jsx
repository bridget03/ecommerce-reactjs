import React, { useState } from 'react';
import bgImg from '@assets/images/right-img-login.jpeg';
import Button from '@components/Button/Button';
import Logo from './components/Logo';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:4545/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('API response:', data);
      if (data.success && data.user && data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token); // Lưu token mới vào localStorage
        window.location.href = '/admin/admin-page'; // Dùng window.location.href để reload trang, đảm bảo lấy token mới nhất
      } else if (data.success === false) {
        setError(data.message || 'Đăng nhập thất bại!');
        console.log('Lỗi đăng nhập:', data.message);
      } else {
        setError('Bạn không có quyền truy cập trang này!');
        console.log('Không phải admin hoặc thiếu trường user:', data);
      }
    } catch (err) {
      console.log('Fetch error:', err);
      setError('Đăng nhập thất bại!');
    }
  };

  return (
    <div className='relative flex flex-col md:flex-row min-h-screen justify-center items-center '>
      <div className='absolute md:top-10 md:left-10 top-5 left-5'>
        <Logo />
      </div>
      <div className='w-full md:w-1/2 flex items-center justify-center  h-full'>
        <div className='bg-white md:shadow-md rounded-lg px-6 py-14 w-full max-w-md md:mt-0 '>
          <h1 className='text-2xl font-bold mb-4 text-[#2D405A] text-center'>
            Login your account
          </h1>
          <p className='mb-6 text-[#2D405A] md:text-[16px] text-[13px] text-center'>
            Welcome back! Please enter your details
          </p>
          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-[#2D405A]'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                required
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-[#2D405A]'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10'
                  required
                />
                <div
                  className='absolute inset-y-0 right-2 flex items-center cursor-pointer text-[#2D405A]'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </div>
              </div>
            </div>
            {error && <div className='text-red-500 text-center'>{error}</div>}
            <div className='w-full item-center flex justify-center mt-4'>
              <Button content={'Login'} type='submit' />
            </div>
          </form>
        </div>
      </div>
      <div className='hidden md:block w-full md:w-1/2 h-screen'>
        <img src={bgImg} alt='Doctor' className='w-full h-full object-cover ' />
      </div>
    </div>
  );
};

export default Login;
