import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import Footer from '@components/Footer/Footer.jsx';
import React from 'react';

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
  return (
    <div className={styles.container}>
      <Header />
      <MainLayout>
        <section className='text-center py-10'>
          <p className='text-sm font-medium text-gray-500 tracking-widest mb-2 flex items-center justify-center'>
            <span className='flex-grow border-t border-gray-300 mx-4'></span>
            WE TRY OUR BEST FOR YOU
            <span className='flex-grow border-t border-gray-300 mx-4'></span>
          </p>
          <h1 className='text-3xl mb-8'>Chào mừng bạn đến với Sato Store</h1>

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
              Chúng tôi rất vui khi giúp bạn
            </p>
            <p className='text-[28px] font-normal mb-6 text-gray-800'>
              Có bất kỳ câu hỏi nào không?
            </p>
            <Accordion className='w-full max-w-5xl mx-auto'>
              {[
                'Chính sách đổi trả như thế nào?',
                'Làm thế nào để chọn đúng kích cỡ?',
                'Tôi có thể tùy chỉnh đơn hàng của mình không?',
                'Phương thức thanh toán nào được chấp nhận?',
                'Làm thế nào để theo dõi đơn hàng của tôi?',
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
                      'Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua hàng với hóa đơn gốc.'}
                    {index === 1 &&
                      'Vui lòng tham khảo hướng dẫn kích cỡ của chúng tôi để đo đạc chính xác hoặc liên hệ hỗ trợ để được hỗ trợ.'}
                    {index === 2 &&
                      'Có, chúng tôi cung cấp tùy chỉnh cho các sản phẩm được chọn. Liên hệ hỗ trợ để biết thêm chi tiết.'}
                    {index === 3 &&
                      'Chúng tôi chấp nhận các thẻ tín dụng chính, PayPal và chuyển khoản ngân hàng.'}
                    {index === 4 &&
                      'Sau khi mua hàng, bạn sẽ nhận được liên kết theo dõi qua email để theo dõi đơn hàng của mình.'}
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
