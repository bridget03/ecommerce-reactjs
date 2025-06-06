// CheckOut/components/Billing/Billing.jsx
import React from 'react';
import styles from './styles.module.scss';

import visa from '@icons/paymentMethods/visa.jpeg';
import mastercard from '@icons/paymentMethods/master-card.jpeg';
import paypal from '@icons/paymentMethods/paypal.jpeg';
import amex from '@icons/paymentMethods/american-express.jpeg';
import maestro from '@icons/paymentMethods/maestro.jpeg';
import bitcoin from '@icons/paymentMethods/bitcoin.jpeg';

import MainLayout from '@components/Layout/Layout';
import Button from '@components/Button/Button';

import { useState } from 'react';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { deleteAll } from '@apis/cartService';

const BillingDetails = ({ billingDetails }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { listProductCart, setListProductCart, handleGetListProductCart } =
    useContext(SideBarContext);
  const paymentMethod = localStorage.getItem('paymentMethod');

  const total = listProductCart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const paymentMethods = [
    { src: visa, alt: 'Visa' },
    { src: mastercard, alt: 'Mastercard' },
    { src: paypal, alt: 'Paypal' },
    { src: amex, alt: 'American Express' },
    { src: maestro, alt: 'Maestro' },
    { src: bitcoin, alt: 'Bitcoin' },
  ];

  const userId = Cookies.get('userId');

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('token');
      if (!token) {
        alert('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
        setIsLoading(false);
        return;
      }

      const orderPayload = {
        userId,
        items: listProductCart.map((item) => ({
          _id: item._id || item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        totalAmount: total,
        shippingAddress: {
          fullName: `${billingDetails.firstName} ${billingDetails.lastName}`,
          address:
            billingDetails.street +
            (billingDetails.apartment ? `, ${billingDetails.apartment}` : ''),
          city: billingDetails.city,
          phone: billingDetails.phone,
        },
        paymentMethod:
          paymentMethod === 'vnpay' || paymentMethod === 'momo'
            ? paymentMethod
            : 'cod',
        paymentStatus:
          paymentMethod === 'vnpay' || paymentMethod === 'momo'
            ? 'pending'
            : 'completed',
      };

      const orderRes = await axios.post(
        'http://localhost:4545/api/orders',
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orderId = orderRes?.data?.order?._id;

      if (!orderId) {
        alert('Không thể tạo đơn hàng. Vui lòng thử lại.');
        setIsLoading(false);
        return;
      }

      if (paymentMethod === 'vnpay') {
        const res = await axios.post(
          'http://localhost:4545/api/payment/create_payment_url',
          { orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const paymentUrl = res?.data?.data?.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
          return;
        }
      } else if (paymentMethod === 'momo') {
        const momoUrl = localStorage.getItem('momoPayUrl');
        const orderId = localStorage.getItem('orderId');
        if (momoUrl && orderId) {
          window.location.href = momoUrl;
          return;
        } else {
          toast.error('Không tìm thấy thông tin thanh toán MoMo');
          navigate('/cart');
        }
      } else {
        // COD
        setTimeout(() => {
          navigate(`/order-success?orderId=${orderId}`);
          deleteAll({ userId });
          setListProductCart([]);
          handleGetListProductCart(userId, 'cart');
        }, 1000);
      }
    } catch (err) {
      console.error('Lỗi thanh toán:', err);
      alert('Thanh toán thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCart = () => {
    console.log('payment');
  };
  return (
    <MainLayout>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Thông tin thanh toán</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='font-medium'>Họ:</p>
                <p>{billingDetails.firstName}</p>
              </div>
              <div>
                <p className='font-medium'>Tên:</p>
                <p>{billingDetails.lastName}</p>
              </div>
              <div>
                <p className='font-medium'>Quốc gia:</p>
                <p>{billingDetails.country}</p>
              </div>
              <div>
                <p className='font-medium'>Địa chỉ:</p>
                <p>{billingDetails.street}</p>
              </div>
              <div>
                <p className='font-medium'>Phòng, căn hộ:</p>
                <p>{billingDetails.apartment || 'N/A'}</p>
              </div>
              <div>
                <p className='font-medium'>Thành phố:</p>
                <p>{billingDetails.city}</p>
              </div>
              <div>
                <p className='font-medium'>Điện thoại:</p>
                <p>{billingDetails.phone}</p>
              </div>
              <div className='col-span-2'>
                <p className='font-medium'>Ghi chú:</p>
                <p>{billingDetails.note || 'Không có ghi chú'}</p>
              </div>
            </div>
          </div>
          <div className='bg-white shadow-xl rounded-xl p-8'>
            <h3 className='text-2xl font-semibold mb-6 text-gray-800'>
              Đơn hàng của bạn
            </h3>

            {listProductCart.map((item) => (
              <div key={item.userId}>
                <div className={styles.product}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.image}
                  />
                  <div className={styles.details}>
                    <p className={styles.name}>{item.name}</p>

                    <span>
                      Size: <span className={styles.blurText}>{item.size}</span>
                    </span>
                    <p
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span>
                        {item.quantity} × {item.price.toLocaleString('vi-VN')}
                        VNĐ
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.priceGroup}>
              <div className={styles.line}>
                <span>Tổng tiền</span>
                <span>{total.toLocaleString('vi-VN')} VNĐ</span>
              </div>
              <div className={`${styles.line} ${styles.total}`}>
                <span>Tổng cộng</span>
                <span>{total.toLocaleString('vi-VN')} VNĐ</span>
              </div>
            </div>

            <div className={styles.buttonContainer}>
              <div onClick={handlePayment}>
                <Button
                  className={styles.orderButton}
                  content={isLoading ? 'Đang xử lý...' : 'Tiếp tục thanh toán'}
                  disabled={isLoading}
                />
              </div>
              <div onClick={handleBackToCart}>
                <Button content={'Quay lại giỏ hàng'} isPrimary={false} />
              </div>
            </div>

            <div className={styles.safeCheckoutContainer}>
              <h4>
                Đảm bảo <span className={styles.safeText}>AN TOÀN</span> THANH
                TOÁN
              </h4>
              <div className={styles.paymentIcons}>
                {paymentMethods.map((method, index) => (
                  <div key={index} className={styles.paymentIcon}>
                    <span className={styles.tooltip}>
                      Pay safely with {method.alt}
                    </span>
                    <img src={method.src} alt={method.alt} />
                  </div>
                ))}
              </div>
              <p>
                Thanh toán của bạn <strong>100% an toàn</strong>
              </p>
            </div>
          </div>{' '}
        </div>
      </div>
    </MainLayout>
  );
};

export default BillingDetails;
