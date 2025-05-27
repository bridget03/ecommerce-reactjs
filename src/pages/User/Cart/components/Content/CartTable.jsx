import React, { useState } from 'react';
import styles from './styles.module.scss';

import { deleteItem, deleteAll } from '@/apis/cartService';
import { getCart } from '@/apis/cartService';

import { useContext, useEffect } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import SelectBox from '@pages/User/OurShop/components/SelectBox';
import LoadingCart from '@pages/User/Cart/components/Loading';
import Cookies from 'js-cookie';

function CartTable({ productCart, getData, isLoading }) {
  const userId = Cookies.get('userId');
  const [cartItems, setCartItems] = useState(productCart);

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

  const {
    listProductCart,
    handleGetListProductCart,

    setListProductCart,
  } = useContext(SideBarContext);

  const handleRemove = (productId, userId) => {
    deleteItem({ productId, userId })
      .then((res) => {
        handleGetListProductCart(userId, 'cart');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.itemContainer}>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {listProductCart.map((item) => (
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
                  onClick={() => handleRemove(item._id, userId)}
                >
                  🗑️
                </button>
              </td>
              <td className={styles.blurText}>${item.price.toFixed(2)}</td>
              <td>
                <SelectBox
                  options={showOptions}
                  getValue={(e) =>
                    getValueSelect(userId, item.id, e, item.size)
                  }
                  type='show'
                  value={item.quantity}
                />
              </td>
              <td className={styles.blurText}>
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <LoadingCart />}
    </div>
  );
}

export default CartTable;
