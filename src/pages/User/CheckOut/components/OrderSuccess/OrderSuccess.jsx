import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from '@components/Button/Button';
import { deleteAll } from '@apis/cartService';
import { SideBarContext } from '@contexts/SideBarProvider';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Step from '@components/Step/Step';
import MainLayout from '@components/Layout/Layout';

const OrderSuccess = () => {
  const { setListProductCart, handleGetListProductCart, userId } =
    useContext(SideBarContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = new URLSearchParams(location.search).get('orderId');
  const [activeStep, setActiveStep] = useState(3);

  const handleBackHome = () => {
    navigate('/');
    deleteAll({ userId })
      .then(() => {
        handleGetListProductCart(userId, 'cart');
      })
      .catch((error) => {
        console.error('Error deleting cart:', error);
      });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = Cookies.get('token');

        if (!token) {
          console.error('OrderSuccess: No token found, redirecting to login');
          navigate('/login');
          return;
        }

        if (!orderId) {
          setErrorMessage('Missing order ID');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4545/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(response.data.order);
        setLoading(false);
        localStorage.removeItem('orderId');
        localStorage.removeItem('momoPayUrl');
      } catch (error) {
        console.error('OrderSuccess: Error fetching order:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        setErrorMessage(
          error.response?.data?.message ||
            error.message ||
            'Failed to load order details'
        );
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin' />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <div className='bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center'>
          <h2 className='text-3xl font-bold text-red-600 mb-4'>Lỗi</h2>
          <p className='text-gray-600 mb-6'>{errorMessage}</p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button
              content='Quay lại trang chủ'
              onClick={() => navigate('/')}
              className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300'
            />
            <Button
              content='Thử lại'
              onClick={() => window.location.reload()}
              isPrimary={false}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300'
            />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
        <div className='bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center'>
          <h2 className='text-3xl font-bold text-red-600 mb-4'>
            Đơn hàng không tìm thấy
          </h2>
          <p className='text-gray-600 mb-6'>
            Không tìm thấy thông tin đơn hàng. Vui lòng thử lại.
          </p>
          <Button
            content='Quay lại trang chủ'
            onClick={() => navigate('/')}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300'
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='mt-[83px]'>
        <MainLayout>
          <Step activeStep={activeStep} setActiveStep={setActiveStep} />
          <div className='bg-white shadow-2xl rounded-2xl p-8 max-w-4xl w-full mx-auto mt-10'>
            <div className='flex justify-center items-center gap-4 mb-6'>
              <svg
                fill='#35c322'
                width='40'
                height='40'
                viewBox='0 0 46 46'
                xmlns='http://www.w3.org/2000/svg'
                className='flex-shrink-0'
              >
                <path
                  d='M23,0C10.298,0,0,10.298,0,23s10.298,23,23,23s23-10.297,23-23S35.702,0,23,0z M20.887,32.482
              c-0.609,0.608-1.437,0.951-2.298,0.951s-1.689-0.343-2.298-0.951l-7.122-7.123c-1.269-1.269-1.269-3.327,0-4.596
              s3.327-1.27,4.597,0l4.243,4.242c0.321,0.32,0.84,0.32,1.161,0l11.489-11.489c1.271-1.27,3.327-1.27,4.597,0
              s1.27,3.327,0,4.597L20.887,32.482z'
                />
              </svg>
              <h2 className='text-3xl font-bold text-green-600'>
                Thanh toán thành công!
              </h2>
            </div>
            <p className='text-center text-gray-600 mb-8 text-lg'>
              Cảm ơn bạn đã mua hàng tại{' '}
              <span className='font-semibold text-gray-800'>SatoStore</span>.
            </p>
            <div className='border-t border-gray-200 pt-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Chi tiết đơn hàng
              </h3>
              <div className='space-y-3 text-gray-700 text-base'>
                <p className='flex justify-between'>
                  <span className='font-medium'>Mã đơn hàng:</span>
                  <span className='truncate max-w-[50%]'>{order._id}</span>
                </p>
                <p className='flex justify-between'>
                  <span className='font-medium'>Tổng tiền:</span>
                  <span>
                    {order.totalAmount.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                </p>
                <p className='flex justify-between'>
                  <span className='font-medium'>Phương thức thanh toán:</span>
                  <span>{order.paymentMethod.toUpperCase()}</span>
                </p>
                {order.paymentInfo && (
                  <>
                    <p className='flex justify-between'>
                      <span className='font-medium'>Mã giao dịch MoMo:</span>
                      <span className='truncate max-w-[50%]'>
                        {order.paymentInfo.transId}
                      </span>
                    </p>
                    <p className='flex justify-between'>
                      <span className='font-medium'>Thông điệp:</span>
                      <span>{order.paymentInfo.message}</span>
                    </p>
                  </>
                )}
                <p className='flex justify-between'>
                  <span className='font-medium'>Trạng thái:</span>
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
              </div>
            </div>
            <div className='border-t border-gray-200 mt-6 pt-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Thông tin giao hàng
              </h3>
              <div className='space-y-3 text-gray-700 text-base'>
                <p className='flex justify-between'>
                  <span className='font-medium'>Người nhận:</span>
                  <span>{order.shippingAddress.fullName}</span>
                </p>
                <p className='flex justify-between'>
                  <span className='font-medium'>Địa chỉ:</span>
                  <span className='truncate max-w-[50%]'>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}
                  </span>
                </p>
                <p className='flex justify-between'>
                  <span className='font-medium'>Điện thoại:</span>
                  <span>{order.shippingAddress.phone}</span>
                </p>
              </div>
            </div>
            <div className='mt-8 flex justify-center' onClick={handleBackHome}>
              <Button
                content='Quay lại trang chủ'
                className='bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105'
              />
            </div>
          </div>
        </MainLayout>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
