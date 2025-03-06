import React, { useState } from 'react';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button.jsx';

const Item = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Amet faucibus nunc',
      size: 'M',
      price: 1879.99,
      sku: 87654,
      quantity: 1,
      image:
        '  https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-7.1-min.jpg',
    },
    {
      id: 2,
      name: 'Dignissim molestie pellentesque',
      size: 'M',
      price: 879.99,
      sku: 34567,
      quantity: 2,
      image:
        'https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-7.1-min.jpg',
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className={styles.itemContainer}>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className={styles.flexItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <p>{item.name}</p>
                  <span>
                    Size: <span className={styles.blurText}>{item.size}</span>
                  </span>
                </div>
              </td>
              <td>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                >
                  🗑️
                </button>
              </td>
              <td className={styles.blurText}>${item.price.toFixed(2)}</td>
              <td>{item.sku}</td>
              <td>
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </td>
              <td className={styles.blurText}>
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.cartActions}>
        <div className={styles.couponBox}>
          <input
            type='text'
            placeholder='Coupon code'
            className={styles.couponInput}
          />
          <div className={styles.okBtn}>
            <Button
              content={'OK'}
              isPrimary={false}
              btnWidth={'40'}
              btnHeight={'37'}
              btnBorderRadius={'0'}
            />
          </div>
        </div>

        <Button
          content={'🗑️ Clear Shopping Cart'}
          isPrimary={false}
          btnWidth={'230'}
        />
      </div>
    </div>
  );
};

export default Item;
