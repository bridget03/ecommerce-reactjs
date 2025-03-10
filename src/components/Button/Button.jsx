import styles from './styles.module.scss';
import classNames from 'classnames';
function Button({ type = 'button', onClick, content, isPrimary = true }) {
  const { btn, primaryBtn, secondaryBtn } = styles;
  return (
    <button
      type={type}
      className={classNames(btn, {
        [primaryBtn]: isPrimary,
        [secondaryBtn]: !isPrimary,
      })}
    >
      {content}
    </button>
  );
}

export default Button;
