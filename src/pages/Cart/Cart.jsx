import styles from './styles.module.scss';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Step from './components/Step/Step';
import Content from './components/Content/Content';
function Cart() {
  return (
    <>
      <Header />
      <div className={styles.cartBody}>
        <Step />
        <Content />
      </div>
      <Footer />
    </>
  );
}

export default Cart;
