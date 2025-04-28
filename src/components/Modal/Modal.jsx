import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@components/Button/Button';

import styles from './styles.module.scss';

function Modal({ isOpen, onConfirm, onClose, title, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>
          {children}
          <div className={styles.actions}>
            <div onClick={onConfirm}>
              <Button content={'Remove'} />
            </div>
            <div onClick={onClose}>
              <Button content={'Close'} isPrimary={false} />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
