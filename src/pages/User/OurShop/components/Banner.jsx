import styles from './styles.module.scss';
import CountDownTimer from '@components/CountDownTimer/CountDownTimer.jsx';
import Button from '@components/Button/Button.jsx';
import { useContext } from 'react';

function Banner() {
  const targetDate = '2025-04-29T00:00:00';

  return (
    <>
      <div className={styles.container}>
        <div className={styles.insideBanner}>
          <div className={styles.countDown}>
            <CountDownTimer targetDate={targetDate} />
          </div>
          <div className={styles.title}>The Classics Make A Comeback</div>
          <div className={styles.button}>
            <Button content={'Mua ngay'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
