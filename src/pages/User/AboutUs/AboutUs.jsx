import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import Footer from '@components/Footer/Footer.jsx';
import React, { useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import styles from './styles.module.scss';

function AboutUs() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Header />
      <MainLayout>
        <section className='text-center py-10'>
          {/* <p className='text-xl font-normal mb-2'>WE TRY OUR BEST FOR YOU</p> */}
          <p className='text-sm font-medium text-gray-500 tracking-widest mb-2 flex items-center justify-center'>
            <span className='flex-grow border-t border-gray-300 mx-4'></span>
            WE TRY OUR BEST FOR YOU
            <span className='flex-grow border-t border-gray-300 mx-4'></span>
          </p>
          <h1 className='text-3xl mb-8'>Welcome to the Sato Store</h1>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {['/about-us/1.png', '/about-us/2.png', '/about-us/3.png'].map(
              (src, index) => (
                <div key={index} className='space-y-4'>
                  <img
                    src={src}
                    alt={`Image ${index + 1}`}
                    className='w-full rounded-lg'
                  />
                  <p className='text-sm'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla facilisi.
                  </p>
                </div>
              )
            )}
          </div>

          <div className='flex justify-center mt-10 flex-wrap gap-16'>
            {[
              '/about-us/brand/adidas-logo.png',
              '/about-us/brand/boss.jpg',
              '/about-us/brand/calvin-klein-logo.png',
              '/about-us/brand/Gymshark-Logo-tumb.png',
              '/about-us/brand/levis.png',
              '/about-us/brand/burberry.png',
              '/about-us/brand/Ralph-Lauren-Logo.png',
            ].map((src, index) => (
              <img
                key={index}
                src={src}
                alt='Partner Logo'
                className='w-28 grayscale hover:grayscale-0 transition duration-300'
              />
            ))}
          </div>

          <div className='mt-16'>
            <p className='text-sm font-normal  mb-4 text-[#555]'>
              WE ARE HAPPY TO HELP YOU
            </p>
            <p className='text-[28px] font-normal mb-6 text-gray-800'>
              Have Any Questions?
            </p>
            <Accordion className='w-full max-w-5xl mx-auto'>
              {[
                'What is your return policy?',
                'How do I choose the right size?',
                'Can I customize my order?',
                'What payment methods are accepted?',
                'How can I track my order?',
              ].map((question, index) => (
                <AccordionItem key={index} className='border-b'>
                  <AccordionItemHeading>
                    <AccordionItemButton className='py-8 flex justify-between text-left font-normal text-gray-800'>
                      {question}
                      <span className='mr-12'>{'+'}</span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className='p-3 text-gray-600'>
                    {index === 0 &&
                      'We accept returns within 30 days of purchase with the original receipt.'}
                    {index === 1 &&
                      'Please refer to our size guide for accurate measurements or contact support for help.'}
                    {index === 2 &&
                      'Yes, we offer customization for selected products. Contact support for details.'}
                    {index === 3 &&
                      'We accept major credit cards, PayPal, and bank transfers.'}
                    {index === 4 &&
                      'After purchase, you will receive a tracking link via email to monitor your order.'}
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </MainLayout>
      <Footer />
    </div>
  );
}

export default AboutUs;
