import React from 'react';
import styles from './styles.module.scss';
import CheckOutForm from './components/CheckOutForm/CheckOutForm';
import OrderSummary from './components/OrderSummary/OrderSummary';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import MainLayout from '@components/Layout/Layout';
import Step from '@components/Step/Step';
import { useState } from 'react';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(2);
  return (
    <>
      <Header />

      <div className={styles.cartBody}>
        <Step activeStep={activeStep} setActiveStep={setActiveStep} />
        <MainLayout>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <CheckOutForm />
              <OrderSummary />
            </div>
          </div>
        </MainLayout>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
