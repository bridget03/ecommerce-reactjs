import styles from './styles.module.scss';
import classNames from 'classnames';
function Button({
  type = 'button',
  onClick,
  content,
  btnWidth,
  btnHeight,
  btnBorderRadius,
  isPrimary = true,
  isWidthFull = false,
}) {
  const { btn, primaryBtn, secondaryBtn } = styles;
  return (
    <button
      type={type}
      className={classNames(btn, {
        [primaryBtn]: isPrimary,
        [secondaryBtn]: !isPrimary,
        [styles.widthFull]: isWidthFull,
      })}
      style={{
        width: `${btnWidth}px`,
        height: `${btnHeight}px`,
        borderRadius: `${btnBorderRadius}px`,
      }}
    >
      {content}
    </button>
  );
}

export default Button;
