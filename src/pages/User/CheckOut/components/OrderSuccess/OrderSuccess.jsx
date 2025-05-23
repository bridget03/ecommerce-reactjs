import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@components/Layout/Layout';

const OrderSuccess = () => {
  const location = useLocation();
  const { order } = location.state || {};

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
    <MainLayout>
      <div className='max-w-4xl mx-auto py-10 px-6'>
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          <h1 className='text-3xl font-bold text-green-600 mb-2 text-center'>
            🎉 Đặt hàng thành công!
          </h1>
          <p className='text-center text-gray-600 mb-8'>
            Cảm ơn bạn đã mua hàng tại{' '}
            <span className='font-semibold'>SatoStore</span>.
          </p>

          {/* Thông tin giao hàng */}
          <div className='mb-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              Thông tin giao hàng
            </h2>
            <div className='space-y-1 text-gray-700'>
              <p>
                <strong>Người nhận:</strong> {order.shippingAddress.fullName}
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

          {/* Chi tiết đơn hàng */}
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

          {/* Tổng kết */}
          <div className='bg-gray-50 rounded-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Tổng kết
            </h2>
            <p className='text-lg'>
              <strong>Tổng tiền:</strong>{' '}
              <span className='text-green-600 font-bold'>
                {order.totalAmount.toLocaleString()}đ
              </span>
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong>{' '}
              {order.paymentMethod.toUpperCase()}
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
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
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
