// import React, { useContext, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import MainLayout from '@components/Layout/Layout';
// import Header from '@components/Header/Header.jsx';
// import Footer from '@components/Footer/Footer.jsx';
// import Step from '@components/Step/Step';
// import Button from '@components/Button/Button';
// import { deleteAll } from '@apis/cartService';
// import { SideBarContext } from '@contexts/SideBarProvider';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const OrderSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { order: initialOrder } = location.state || {};
//   const [order, setOrder] = useState(initialOrder);
//   const [activeStep, setActiveStep] = useState(3);
//   const { setListProductCart, handleGetListProductCart } =
//     useContext(SideBarContext);
//   const userId = Cookies.get('userId');

//   useEffect(() => {
//     if (order?.paymentStatus === 'pending') {
//       deleteAll({ userId });
//       setListProductCart([]);
//       handleGetListProductCart(userId, 'cart');
//     }
//   }, [order]);
//   useEffect(() => {
//     if (!order) {
//       const orderId = new URLSearchParams(location.search).get('orderId');
//       if (orderId) {
//         axios
//           .get(`http://localhost:4545/api/orders/${orderId}`, {
//             headers: { Authorization: `Bearer ${Cookies.get('token')}` },
//           })
//           .then((res) => {
//             setOrder(res.data.order);
//           })
//           .catch((err) => {
//             toast.error('Không thể tải thông tin đơn hàng');
//             navigate('/cart');
//           });
//       }
//     }
//   }, [order, location, navigate]);
//   const handleBackToShop = () => {
//     window.location.href = '/shop';
//   };

//   if (!order) {
//     return (
//       <MainLayout>
//         <div className='min-h-screen flex items-center justify-center'>
//           <p className='text-xl font-semibold text-red-600'>
//             Không tìm thấy thông tin đơn hàng.
//           </p>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className='mt-[83px]'>
//         <MainLayout>
//           <Step activeStep={activeStep} setActiveStep={setActiveStep} />
//           <div className='max-w-4xl mx-auto py-10 px-6'>
//             <div className='bg-white rounded-2xl shadow-lg p-8'>
//               {/* Heading */}
//               <h1 className='text-3xl flex justify-center items-center gap-4 text-green-600 mb-2 text-center'>
//                 <svg
//                   fill='#35c322'
//                   width='40'
//                   height='40'
//                   viewBox='0 0 46 46'
//                   xmlns='http://www.w3.org/2000/svg'
//                 >
//                   <path
//                     d='M23,0C10.298,0,0,10.298,0,23s10.298,23,23,23s23-10.297,23-23S35.702,0,23,0z M20.887,32.482
//                     c-0.609,0.608-1.437,0.951-2.298,0.951s-1.689-0.343-2.298-0.951l-7.122-7.123c-1.269-1.269-1.269-3.327,0-4.596
//                     s3.327-1.27,4.597,0l4.243,4.242c0.321,0.32,0.84,0.32,1.161,0l11.489-11.489c1.271-1.27,3.327-1.27,4.597,0
//                     s1.27,3.327,0,4.597L20.887,32.482z'
//                   />
//                 </svg>
//                 Đặt hàng thành công!
//               </h1>
//               <p className='text-center text-gray-600 mb-8'>
//                 Cảm ơn bạn đã mua hàng tại{' '}
//                 <span className='font-semibold'>SatoStore</span>.
//               </p>

//               {/* Shipping Info */}
//               <div className='mb-8'>
//                 <h2 className='text-xl font-semibold text-gray-800 mb-2'>
//                   Thông tin giao hàng
//                 </h2>
//                 <div className='space-y-1 text-gray-700'>
//                   <p>
//                     <strong>Người nhận:</strong>{' '}
//                     {order.shippingAddress.fullName}
//                   </p>
//                   <p>
//                     <strong>Địa chỉ:</strong> {order.shippingAddress.address},{' '}
//                     {order.shippingAddress.city}
//                   </p>
//                   <p>
//                     <strong>Điện thoại:</strong> {order.shippingAddress.phone}
//                   </p>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className='mb-8'>
//                 <h2 className='text-xl font-semibold text-gray-800 mb-4'>
//                   Chi tiết đơn hàng
//                 </h2>
//                 <div className='space-y-4'>
//                   {order.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className='flex items-center gap-4 border rounded-lg p-4'
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className='w-20 h-20 object-cover rounded-lg'
//                       />
//                       <div>
//                         <p className='font-semibold'>{item.name}</p>
//                         <p>Số lượng: {item.quantity}</p>
//                         <p>Giá: {item.price.toLocaleString()}đ</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Summary */}
//               <div className='bg-gray-50 rounded-lg p-6'>
//                 <h2 className='text-xl font-medium text-gray-800 mb-4'>
//                   Tổng kết
//                 </h2>
//                 <div className='space-y-2 text-lg'>
//                   <p>
//                     <span className='font-semibold'>Tổng tiền: </span>
//                     <span className='text-green-600'>
//                       {order.totalAmount.toLocaleString()}đ
//                     </span>
//                   </p>
//                   <p>
//                     <span className='font-semibold'>
//                       Phương thức thanh toán:{' '}
//                     </span>
//                     {order.paymentMethod.toUpperCase()}
//                   </p>
//                   <p>
//                     <span className='font-semibold'>Trạng thái: </span>
//                     <span
//                       className={`font-medium ${
//                         order.paymentStatus === 'completed'
//                           ? 'text-green-600'
//                           : 'text-yellow-600'
//                       }`}
//                     >
//                       {order.paymentStatus}
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               {/* Button */}
//               <div
//                 onClick={handleBackToShop}
//                 className='w-full text-center mt-6'
//               >
//                 <Button content='Quay lại cửa hàng' isPrimary={true} />
//               </div>
//             </div>
//           </div>
//         </MainLayout>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default OrderSuccess;

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../OrderSummary/styles.module.scss';
import Button from '@components/Button/Button';
import { deleteAll } from '@apis/cartService';
import { SideBarContext } from '@contexts/SideBarProvider';
const OrderSuccess = () => {
  const { setListProductCart, handleGetListProductCart, userId } =
    useContext(SideBarContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = new URLSearchParams(location.search).get('orderId');

  console.log('OrderSuccess: orderId from query:', orderId);
  const handleBackHome = () => {
    console.log('handleBackHome');
    navigate('/');
    deleteAll({ userId })
      .then((res) => {
        console.log('deleteAll');
        handleGetListProductCart(userId, 'cart');
      })
      .catch((error) => {
        console.log(error);
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
          console.error('OrderSuccess: No orderId provided');
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
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div className='bg-white shadow-xl rounded-xl p-8'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Lỗi</h2>
        <p>{errorMessage}</p>
        <div className={styles.buttonContainer}>
          <Button content='Quay lại trang chủ' onClick={() => navigate('/')} />
          <Button
            content='Thử lại'
            onClick={() => window.location.reload()}
            isPrimary={false}
          />
        </div>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className='bg-white shadow-xl rounded-xl p-8'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
        Thanh toán thành công!
      </h2>
      <p>
        <strong>Mã đơn hàng:</strong> {order._id}
      </p>
      <p>
        <strong>Tổng tiền:</strong> ${order.totalAmount}
      </p>
      <p>
        <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
      </p>
      {order.paymentInfo && (
        <>
          <p>
            <strong>Mã giao dịch MoMo:</strong> {order.paymentInfo.transId}
          </p>
          <p>
            <strong>Thông điệp:</strong> {order.paymentInfo.message}
          </p>
        </>
      )}
      <div className={styles.buttonContainer} onClick={handleBackHome}>
        <Button content='Quay lại trang chủ' />
      </div>
    </div>
  );
};

export default OrderSuccess;
