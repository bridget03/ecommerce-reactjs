import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { StoreContext } from '@/contexts/StoreProvider';
import { toast } from 'react-toastify';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Button from '@components/Button/Button';

import MainLayout from '@components/Layout/Layout';

const MyOrder = () => {
  const { userInfo } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = Cookies.get('token');

        if (!token || !userInfo) {
          console.error('MyOrder: No token or user info, redirecting to login');
          toast.error('Vui lòng đăng nhập để xem đơn hàng.');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:4545/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders || []);
        setLoading(false);
      } catch (error) {
        console.error('MyOrder: Error fetching orders:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            'Không thể tải danh sách đơn hàng.'
        );
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate, userInfo]);

  const handleViewOrder = (orderId) => {
    console.log('navigate', orderId);
    navigate(`/order-status?orderId=${orderId}`);
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin' />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12'>
        <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>Lỗi</h2>
          <p className='text-gray-600 mb-6'>{errorMessage}</p>
          <button
            onClick={() => navigate('/')}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200'
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className='mt-[83px]'>
        <MainLayout>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
              Đơn hàng của tôi
            </h2>
            {orders.length === 0 ? (
              <div className='bg-white shadow-lg rounded-lg p-8 text-center'>
                <p className='text-gray-600 text-lg'>
                  Bạn chưa có đơn hàng nào.
                </p>
                <button
                  onClick={() => navigate('/shop')}
                  className='mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200'
                >
                  Mua sắm ngay
                </button>
              </div>
            ) : (
              <div className='space-y-6'>
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className='bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-200'
                  >
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-800'>
                          Mã đơn hàng: {order._id}
                        </h3>
                        <p className='text-sm text-gray-500'>
                          Ngày đặt:{' '}
                          {new Date(order.createdAt).toLocaleDateString(
                            'vi-VN'
                          )}
                        </p>
                      </div>

                      <div onClick={() => handleViewOrder(order._id)}>
                        <Button
                          className='mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
                          content={'Xem chi tiết'}
                        ></Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      <p className='text-gray-700'>
                        <span className='font-medium'>Tổng tiền:</span>{' '}
                        {order.totalAmount.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-medium'>Phương thức:</span>{' '}
                        {order.paymentMethod.toUpperCase()}
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-medium'>Trạng thái:</span>{' '}
                        <span
                          className={`font-medium ${
                            order.paymentStatus === 'completed'
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)}
                        </span>
                      </p>
                      <p className='text-gray-700'>
                        <span className='font-medium'>Người nhận:</span>{' '}
                        {order.shippingAddress.fullName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </MainLayout>
      </div>
      <Footer />
    </>
  );
};

export default MyOrder;
