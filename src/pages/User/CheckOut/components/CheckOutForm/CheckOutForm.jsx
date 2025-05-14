import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CheckoutForm = ({ billingDetails, setBillingDetails }) => {
  const initialValues = {
    firstName: billingDetails.firstName || '',
    lastName: billingDetails.lastName || '',
    country: billingDetails.country || '',
    street: billingDetails.street || '',
    apartment: billingDetails.apartment || '',
    city: billingDetails.city || '',
    phone: billingDetails.phone || '',
    note: billingDetails.note || '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    country: Yup.string().required('Country is required'),
    street: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]{9,15}$/, 'Invalid phone number'),
  });

  const handleSubmit = (values) => {
    setBillingDetails(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Form
          className='w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl'
          onSubmit={handleSubmit}
        >
          <h3 className='text-2xl font-semibold mb-6 text-gray-800'>
            Shipping Address
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Field
                name='firstName'
                placeholder='First Name *'
                className='w-full px-4 py-3 border rounded-lg'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>

            <div>
              <Field
                name='lastName'
                placeholder='Last Name *'
                className='w-full px-4 py-3 border rounded-lg'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='text-red-500 text-sm mt-1'
              />
            </div>
          </div>

          <div className='mt-4'>
            <Field
              name='country'
              placeholder='Country *'
              className='w-full px-4 py-3 border rounded-lg'
            />
            <ErrorMessage
              name='country'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          <div className='mt-4'>
            <Field
              name='street'
              placeholder='Street address *'
              className='w-full px-4 py-3 border rounded-lg'
            />
            <ErrorMessage
              name='street'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          <div className='mt-4'>
            <Field
              name='apartment'
              placeholder='Apartment, suite, unit (optional)'
              className='w-full px-4 py-3 border rounded-lg'
            />
          </div>

          <div className='mt-4'>
            <Field
              name='city'
              placeholder='City *'
              className='w-full px-4 py-3 border rounded-lg'
            />
            <ErrorMessage
              name='city'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          <div className='mt-4'>
            <Field
              name='phone'
              placeholder='Phone *'
              className='w-full px-4 py-3 border rounded-lg'
            />
            <ErrorMessage
              name='phone'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          <div className='mt-4'>
            <Field
              name='note'
              as='textarea'
              placeholder='Order Notes (optional)'
              className='w-full px-4 py-3 border rounded-lg'
              rows={3}
            />
          </div>

          <div className='mt-8 text-right'>
            <button
              type='submit'
              className='px-6 py-3 bg-[#333] text-white rounded-lg shadow-md hover:bg-white hover:text-[#333] hover:border-[#555] hover:border-1 transition cursor-pointer'
            >
              Save Billing Details
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
