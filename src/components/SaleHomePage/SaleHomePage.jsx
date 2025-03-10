import styles from './styles.module.scss';
import Button from '../Button/Button.jsx';
function SaleHomePage() {
  return (
    <div className={styles.container}>
      <div>
        <img
          src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_1.jpeg'
          alt='#'
        />
      </div>
      <div>
        <h2 className={styles.title}>Sale Of The Year</h2>
        <p className={styles.des}>
          Libero sed faucibus facilisis fermentum. Est nibh sed massa sodales.
        </p>
        <div className={styles.btn}>
          <Button content={'Read more'} isPrimary={false} />
        </div>
      </div>
      <div>
        <img
          src='https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_2.jpeg'
          alt='#'
        />
      </div>
    </div>
  );
}

export default SaleHomePage;
