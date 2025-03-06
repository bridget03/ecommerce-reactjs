import styles from './styles.module.scss';
import Stepper from './Stepper';

function Step() {
  const dataSteps = [
    { number: 1, content: 'Shopping Cart' },
    { number: 2, content: 'Check Out' },
    { number: 3, content: 'Order Status' },
  ];
  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepGroup}>
        {dataSteps.map((item, index) => (
          <>
            <Stepper
              number={item.number}
              text={item.content}
              key={index}
              isDisable={index !== 0}
            />
            {index !== dataSteps.length - 1 && <div className={styles.line} />}
          </>
        ))}
      </div>
      <p>Hurry up, these products are limited, checkout within</p>
    </div>
  );
}

export default Step;
