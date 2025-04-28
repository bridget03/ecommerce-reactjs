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

const OrderSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const navigate = useNavigate();

  const { listProductCart, handleGetListProductCart } =
    useContext(SideBarContext);
  const total = listProductCart.reduce((acc, item) => {
    return acc + item.total;
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
  const handlePlaceOrder = () => {
    // Xử lý logic đặt hàng ở đây
    console.log('Đặt hàng thành công!');
    navigate('/shop');
  };

  return (
    <div className={styles.summary}>
      <h3 className={styles.title}>Your Order</h3>

      {listProductCart.map((item) => (
        <div key={item.userId}>
          <div className={styles.product}>
            <img
              src={item.images[0]}
              alt={item.name}
              className={styles.image}
            />
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

          <div className={styles.payments}>
            <label>
              <input
                type='radio'
                name='payment'
                value='check'
                checked={paymentMethod === 'check'}
                onChange={() => setPaymentMethod('check')}
                style={{ marginRight: '10px' }}
              />
              Check payments
            </label>
            {paymentMethod === 'check' && (
              <p className={styles.note}>
                Please send a check to Store Name, Store Street, Store Town,
                Store State / County, Store Postcode.
              </p>
            )}

            <label>
              <input
                type='radio'
                name='payment'
                value='cash'
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                style={{ marginRight: '10px' }}
              />
              Cash on delivery
            </label>
            {paymentMethod === 'cash' && (
              <p className={styles.note}>Pay with cash upon delivery.</p>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <div onClick={handlePlaceOrder}>
              <Button
                className={styles.orderButton}
                content={'PLACE ORDER'}
              ></Button>
            </div>
            <div onClick={handleBackToShop}>
              <Button content={'Back To Cart'} isPrimary={false} />
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
      ))}
    </div>
  );
};

export default OrderSummary;
