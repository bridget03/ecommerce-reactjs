import React from 'react';
import styles from './styles.module.scss';
import CheckOutForm from './components/CheckOutForm/CheckOutForm';
import OrderSummary from './components/OrderSummary/OrderSummary';
import BillingDetails from './components/BillingDetails/BillingDetails';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import MainLayout from '@components/Layout/Layout';
import Step from '@components/Step/Step';
import { useState } from 'react';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [isFilled, setIsFilled] = useState(false);

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    apartment: '',
    city: '',
    phone: '',
    note: '',
  });
  return (
    <>
      <Header />

      <div className={styles.cartBody}>
        <Step activeStep={activeStep} setActiveStep={setActiveStep} />
        {!isFilled ? (
          <MainLayout>
            <div className={styles.wrapper}>
              <div className={styles.container}>
                <CheckOutForm
                  billingDetails={billingDetails}
                  setBillingDetails={setBillingDetails}
                />
                <OrderSummary
                  billingDetails={billingDetails}
                  setIsFilled={setIsFilled}
                />
              </div>
            </div>
          </MainLayout>
        ) : (
          <BillingDetails billingDetails={billingDetails} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
