import React, { useState } from 'react';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button.jsx';

import { deleteItem, deleteAll } from '@/apis/cartService';
import { getCart } from '@/apis/cartService';

import { useContext, useEffect } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';

function Item({ productCart }) {
  const [cartItems, setCartItems] = useState(productCart);
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      productCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const {
    listProductCart,
    handleGetListProductCart,
    userId,
    setListProductCart,
    // isLoading,
    // setIsLoading,
  } = useContext(SideBarContext);
  const handleClearAll = () => {
    // setIsLoading(true);
    deleteAll({ userId })
      .then((res) => {
        console.log(res);
        handleGetListProductCart(userId, 'cart');
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
  };
  const handleRemove = (productId, userId) => {
    // setIsLoading(true);
    deleteItem({ productId, userId })
      .then((res) => {
        handleGetListProductCart(userId, 'cart');
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   getCart(userId)
  //     .then((res) => {
  //       setListProductCart(res.data.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setListProductCart([]);
  //       setIsLoading(false);
  //     });
  // }, []);

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
                  src={item.images[0]}
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
                  onClick={() => handleRemove(item.productId, item.userId)}
                >
                  🗑️
                </button>
              </td>
              <td className={styles.blurText}>${item.price.toFixed(2)}</td>
              <td>{item.sku}</td>
              <td>
                <select
                  value={item.quantity}
                  onChange={(e) => {
                    handleQuantityChange(item.id, parseInt(e.target.value));
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
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
            <Button content={'OK'} isPrimary={false} />
          </div>
        </div>

        <div onClick={handleClearAll}>
          <Button content={'🗑️ Clear Shopping Cart'} isPrimary={false} />
        </div>
      </div>
    </div>
  );
}

export default Item;
