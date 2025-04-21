import styles from './styles.module.scss';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Step from '@components/Step/Step';
import Content from './components/Content/Content';
import { useState } from 'react';

function Cart() {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <>
      <Header />
      <div className={styles.cartBody}>
        <Step activeStep={activeStep} setActiveStep={setActiveStep} />
        <Content />
      </div>
      <Footer />
    </>
  );
}

export default Cart;
