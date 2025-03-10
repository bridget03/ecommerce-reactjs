import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
const CountDownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculatedTimeLeft());

  function calculatedTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const formatTimer = (number) => {
    return String(number).padStart(2, '0');
  };
  const timerComponent = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval] !== undefined) {
      timerComponent.push(
        <span className={styles.timeBox} key={interval}>
          {formatTimer(timeLeft[interval])} {interval}{' '}
        </span>
      );
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculatedTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });
  return timerComponent;
};

export default CountDownTimer;
