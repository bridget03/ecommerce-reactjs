import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@components/Layout/Layout';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Step from '@components/Step/Step';
import Button from '@components/Button/Button';
import { deleteAll } from '@apis/cartService';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const OrderStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order: initialOrder } = location.state || {};
  const [order, setOrder] = useState(initialOrder);
  const [activeStep, setActiveStep] = useState(3);
  const { setListProductCart, handleGetListProductCart } =
    useContext(SideBarContext);
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (order?.paymentStatus === 'pending') {
      deleteAll({ userId });
      setListProductCart([]);
      handleGetListProductCart(userId, 'cart');
    }
  }, [order]);
  useEffect(() => {
    if (!order) {
      const orderId = new URLSearchParams(location.search).get('orderId');
      if (orderId) {
        axios
          .get(`http://localhost:4545/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
          })
          .then((res) => {
            setOrder(res.data.order);
          })
          .catch((err) => {
            toast.error('Không thể tải thông tin đơn hàng');
            navigate('/cart');
          });
      }
    }
  }, [order, location, navigate]);
  const handleBackToShop = () => {
    window.location.href = '/shop';
  };

  if (!order) {
    return (
      <MainLayout>
        <div className='min-h-screen flex items-center justify-center'>
          <p className='text-xl font-semibold text-red-600'>
            Không tìm thấy thông tin đơn hàng.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <Header />
      <div className='mt-[83px]'>
        <MainLayout>
          <Step activeStep={activeStep} setActiveStep={setActiveStep} />
          <div className='max-w-4xl mx-auto py-10 px-6'>
            <div className='bg-white rounded-2xl shadow-lg p-8'>
              {/* Heading */}
              <h1 className='text-3xl flex justify-center items-center gap-4 text-green-600 mb-2 text-center'>
                <svg
                  fill='#35c322'
                  width='40'
                  height='40'
                  viewBox='0 0 46 46'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M23,0C10.298,0,0,10.298,0,23s10.298,23,23,23s23-10.297,23-23S35.702,0,23,0z M20.887,32.482
                    c-0.609,0.608-1.437,0.951-2.298,0.951s-1.689-0.343-2.298-0.951l-7.122-7.123c-1.269-1.269-1.269-3.327,0-4.596
                    s3.327-1.27,4.597,0l4.243,4.242c0.321,0.32,0.84,0.32,1.161,0l11.489-11.489c1.271-1.27,3.327-1.27,4.597,0
                    s1.27,3.327,0,4.597L20.887,32.482z'
                  />
                </svg>
                Đặt hàng thành công!
              </h1>
              <p className='text-center text-gray-600 mb-8'>
                Cảm ơn bạn đã mua hàng tại{' '}
                <span className='font-semibold'>SatoStore</span>.
              </p>

              {/* Shipping Info */}
              <div className='mb-8'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                  Thông tin giao hàng
                </h2>
                <div className='space-y-1 text-gray-700'>
                  <p>
                    <strong>Người nhận:</strong>{' '}
                    {order.shippingAddress.fullName}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}
                  </p>
                  <p>
                    <strong>Điện thoại:</strong> {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className='mb-8'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                  Chi tiết đơn hàng
                </h2>
                <div className='space-y-4'>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-4 border rounded-lg p-4'
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-20 h-20 object-cover rounded-lg'
                      />
                      <div>
                        <p className='font-semibold'>{item.name}</p>
                        <p>Số lượng: {item.quantity}</p>
                        <p>Giá: {item.price.toLocaleString()}đ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className='bg-gray-50 rounded-lg p-6'>
                <h2 className='text-xl font-medium text-gray-800 mb-4'>
                  Tổng kết
                </h2>
                <div className='space-y-2 text-lg'>
                  <p>
                    <span className='font-semibold'>Tổng tiền: </span>
                    <span className='text-green-600'>
                      {order.totalAmount.toLocaleString()}đ
                    </span>
                  </p>
                  <p>
                    <span className='font-semibold'>
                      Phương thức thanh toán:{' '}
                    </span>
                    {order.paymentMethod.toUpperCase()}
                  </p>
                  <p>
                    <span className='font-semibold'>Trạng thái: </span>
                    <span
                      className={`font-medium ${
                        order.paymentStatus === 'completed'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>

              {/* Button */}
              <div
                onClick={handleBackToShop}
                className='w-full text-center mt-6'
              >
                <Button content='Quay lại cửa hàng' isPrimary={true} />
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
      <Footer />
    </>
  );
};

export default OrderStatus;
