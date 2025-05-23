import React from 'react';
import styles from './styles.module.scss';
import { useState, useContext, useEffect } from 'react';

import visa from '@icons/paymentMethods/visa.jpeg';
import mastercard from '@icons/paymentMethods/master-card.jpeg';
import paypal from '@icons/paymentMethods/paypal.jpeg';
import amex from '@icons/paymentMethods/american-express.jpeg';
import maestro from '@icons/paymentMethods/maestro.jpeg';
import bitcoin from '@icons/paymentMethods/bitcoin.jpeg';
import Button from '@components/Button/Button';
import SelectBox from '@pages/User/OurShop/components/SelectBox';
import Modal from '@components/Modal/Modal.jsx';

import { SideBarContext } from '@contexts/SideBarProvider';

import { deleteItem } from '@/apis/cartService';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ billingDetails, setIsFilled }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

  const { listProductCart, handleGetListProductCart } =
    useContext(SideBarContext);
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
  const showOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ];
  const getValueSelect = (userId, productId, quantity, size) => {
    const data = {
      userId,
      productId,
      quantity,
      size,
      isMultiple: true,
    };
    getData(data);
  };

  const handleClickRemove = (productId, userId) => {
    setPendingItem({ productId, userId });
    setIsModalOpen(true); // mở modal xác nhận
  };
  const handleConfirmRemove = (productId, userId) => {
    if (!pendingItem) return;

    deleteItem(pendingItem)
      .then(() => {
        handleGetListProductCart(pendingItem.userId, 'cart');
        setIsModalOpen(false);
        setPendingItem(null);
        navigate('/shop'); // nếu muốn chuyển hướng sau khi xóa
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBackToShop = () => {
    navigate('/cart');
  };
  const handleContinue = async () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'country',
      'street',
      'city',
      'phone',
    ];

    const emptyFields = requiredFields.filter(
      (field) => !billingDetails[field]?.trim()
    );

    if (emptyFields.length > 0) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }

    if (paymentMethod === 'cash') {
      try {
        // Build order payload
        const userId = localStorage.getItem('userId'); // hoặc từ context
        const orderPayload = {
          userId,
          items: listProductCart.map((item) => ({
            _id: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          totalAmount: listProductCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          shippingAddress: {
            fullName: `${billingDetails.firstName} ${billingDetails.lastName}`,
            address:
              billingDetails.street +
              (billingDetails.apartment ? `, ${billingDetails.apartment}` : ''),
            city: billingDetails.city,
            phone: billingDetails.phone,
          },
          paymentMethod: 'cod',
        };

        const res = await axios.post(
          'http://localhost:8888/api/orders',
          orderPayload
        );

        alert('Order placed successfully!');
        navigate('/billing'); // Hoặc trang xác nhận đơn hàng
      } catch (error) {
        console.error('Failed to create order:', error);
        alert('Failed to create order');
      }
    } else if (paymentMethod === 'check') {
      // Đặt flow VNPay ở đây sau
      navigate('/payment');
    } else {
      alert('Please select a payment method.');
    }

    setIsFilled(true);
  };

  return (
    <div className='bg-white shadow-xl rounded-xl p-8'>
      <h3 className='text-2xl font-semibold mb-6 text-gray-800'>Your Order</h3>

      {listProductCart.map((item) => (
        <div key={item.userId}>
          <div className={styles.product}>
            <img src={item.image} alt={item.name} className={styles.image} />
            <div className={styles.details}>
              <p className={styles.name}>{item.name}</p>

              <span>
                Size: <span className={styles.blurText}>{item.size}</span>
              </span>
              <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <SelectBox
                  options={showOptions}
                  getValue={(e) =>
                    getValueSelect(item.userId, item.productId, e, item.size)
                  }
                  type='show'
                  value={item.quantity}
                />
                <span>× ${item.price}</span>
              </p>
              <button
                className={styles.remove}
                onClick={() => handleClickRemove(item.productId, item.userId)}
              >
                remove
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setPendingItem(null);
                }}
                onConfirm={() => {
                  handleConfirmRemove(
                    pendingItem.productId,
                    pendingItem.userId
                  );
                  setPendingItem(null);
                }}
                title='Remove Item'
              >
                <p>Are you sure you want to remove?</p>
              </Modal>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.priceGroup}>
        <div className={styles.line}>
          <span>Subtotal</span>
          <span>${total}</span>
        </div>
        <div className={`${styles.line} ${styles.total}`}>
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <div className='mt-4 flex flex-col'>
        <h4 className='font-semibold mb-2'>Select Payment Method</h4>
        <div className=' items-center gap-4'>
          <label className='flex items-center gap-3'>
            <input
              type='radio'
              name='payment'
              value='check'
              checked={paymentMethod === 'check'}
              onChange={() => setPaymentMethod('check')}
              className='mr-2'
            />
            Online payment
          </label>
          {paymentMethod === 'check' && (
            <p className='my-2 ml-6 text-md text-gray-500'>
              We offer direct payment through VNPay.
            </p>
          )}
          <label className='flex items-center gap-3 mt-4'>
            <input
              type='radio'
              name='payment'
              value='cash'
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className='mr-2'
            />
            Cash on delivery
          </label>
          {paymentMethod === 'cash' && (
            <p className='my-2 ml-6 text-md text-gray-500'>
              Pay with cash upon delivery.
            </p>
          )}
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <div onClick={handleContinue}>
          <Button className={styles.orderButton} content={'Continue'}></Button>
        </div>
        <div onClick={handleBackToShop}>
          <Button content={'Back to Cart'} isPrimary={false} />
        </div>
      </div>

      <div className={styles.safeCheckoutContainer}>
        <h4>
          GUARANTEED <span className={styles.safeText}>SAFE</span> CHECKOUT
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
          Your Payment is <strong>100% Secure</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
