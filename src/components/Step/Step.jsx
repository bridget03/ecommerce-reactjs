import styles from './styles.module.scss';
import Stepper from './Stepper';
import { useState, useEffect } from 'react';
import React from 'react';
import { FaFire } from 'react-icons/fa';

function Step({ activeStep, setActiveStep }) {
  const dataSteps = [
    { number: 1, content: 'Giỏ hàng' },
    { number: 2, content: 'Thông tin giao hàng' },
    { number: 3, content: 'Hoàn tất' },
  ];
  const [countdown, setCountdown] = useState(600);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepGroup}>
        {dataSteps.map((item, index) => (
          <React.Fragment key={index}>
            <Stepper
              number={item.number}
              text={item.content}
              key={index}
              isDisable={item.number > activeStep}
              isActive={item.number === activeStep}
              onClick={() => setActiveStep(item.number)}
            />
            {index !== dataSteps.length - 1 && <div className={styles.line} />}
          </React.Fragment>
        ))}
      </div>
      <p>
        <span style={{ color: '#FF4D00', marginRight: '8px' }}>
          <FaFire />
        </span>
        Hãy tiến hành thanh toán ngay để giữ ưu đãi{' '}
        <span style={{ fontWeight: '500', marginLeft: '10px' }}>
          {formattedTime}
        </span>
      </p>
    </div>
  );
}

export default Step;
