import styles from './styles.module.scss';
import cls from 'classnames';

function SelectBox({ options, getValue, type, value }) {
  return (
    <div>
      <select
        className={cls(styles.selectBox)}
        onChange={(e) => getValue(e.target.value, type)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
