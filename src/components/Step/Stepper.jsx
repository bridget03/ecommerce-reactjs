import styles from './styles.module.scss';
import cls from 'classnames';

function Stepper({ number, text, isDisable, isActive }) {
  return (
    <div
      className={cls(styles.step, {
        [styles.active]: isActive,
        [styles.disabled]: isDisable,
      })}
    >
      <div className={styles.number}>{number}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}

export default Stepper;
