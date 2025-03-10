import styles from './styles.module.scss';
import cls from 'classnames';
function Stepper({ number, text, isDisable }) {
  return (
    <div className={styles.step}>
      <div
        className={cls(styles.number, { [styles.isDisableNumber]: isDisable })}
      >
        {number}
      </div>
      <div className={cls(styles.text, { [styles.isDisableText]: isDisable })}>
        {text}
      </div>
    </div>
  );
}

export default Stepper;
