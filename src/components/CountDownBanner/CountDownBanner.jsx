import CountDownTimer from '@components/CountDownTimer/CountDownTimer.jsx';
import Button from '@components/Button/Button';
import styles from './styles.module.scss';

function CountDownBanner() {
  const targetDate = '2025-04-29T00:00:00';

  return (
    <div className={styles.container}>
      {' '}
      <div className={styles.timeBox}>
        <CountDownTimer targetDate={targetDate} />
      </div>
      <div className={styles.title}>The Classics Make A Comeback</div>
      <Button content={'Mua ngay'} />
    </div>
  );
}

export default CountDownBanner;
