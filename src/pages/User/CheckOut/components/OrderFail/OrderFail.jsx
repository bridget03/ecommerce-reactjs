// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import MainLayout from '@components/Layout/Layout';
// import Header from '@components/Header/Header.jsx';
// import Footer from '@components/Footer/Footer.jsx';
// import Button from '@components/Button/Button';

// const OrderFail = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Lấy orderId từ query string
//   const queryParams = new URLSearchParams(location.search);
//   const orderId = queryParams.get('orderId');

//   const handleBackToShop = () => {
//     navigate('/shop');
//   };

//   return (
//     <>
//       <Header />
//       <div className='mt-[83px]'>
//         <MainLayout>
//           <div className='max-w-2xl mx-auto py-20 px-6'>
//             <div className='bg-white rounded-2xl shadow-lg p-10 text-center'>
//               <div className='flex justify-center mb-6'>
//                 <svg
//                   width='60'
//                   height='60'
//                   fill='#f44336'
//                   viewBox='0 0 24 24'
//                   xmlns='http://www.w3.org/2000/svg'
//                 >
//                   <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM13.414 12l4.95 4.95-1.414 1.414L12 13.414l-4.95 4.95-1.414-1.414L10.586 12 5.636 7.05l1.414-1.414L12 10.586l4.95-4.95 1.414 1.414L13.414 12z' />
//                 </svg>
//               </div>
//               <h1 className='text-3xl text-red-600 font-bold mb-4'>
//                 Thanh toán thất bại!
//               </h1>
//               <p className='text-gray-700 mb-4'>
//                 Giao dịch của bạn không thành công. Vui lòng thử lại hoặc chọn
//                 phương thức thanh toán khác.
//               </p>
//               {orderId && (
//                 <p className='text-gray-600 mb-6'>
//                   Mã đơn hàng: <strong>{orderId}</strong>
//                 </p>
//               )}
//               <div className='flex justify-center' onClick={handleBackToShop}>
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

// export default OrderFail;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';

const OrderFail = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-white shadow-xl rounded-xl p-8'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
        Thanh toán thất bại!
      </h2>
      <p>Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
      <div>
        <Button content='Thử lại' onClick={() => navigate('/cart')} />
        <Button
          content='Quay lại trang chủ'
          isPrimary={false}
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default OrderFail;
