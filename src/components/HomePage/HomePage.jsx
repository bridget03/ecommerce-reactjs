import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Banner from '@components/Banner/Banner.jsx';
import Info from '@components/Info/Info.jsx';
import AdvanceHeadline from '@components/AdvanceHeadline/AdvanceHeadline.jsx';
import HeadlineListProduct from '@components/HeadlineListProduct/HeadlineListProduct.jsx';
import { getProduct } from '../../apis/productService';
import { useEffect } from 'react';
function HomePage() {
  useEffect(() => {
    getProduct();
  }, []);
  // (async () => {
  //   try {
  //     const products = await getProduct();
  //     console.log('Fetched products:', products);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // })();
  return (
    <div>
      <div>
        <Header />
        <Banner />
        <Info />
        <AdvanceHeadline />
        <HeadlineListProduct />
        <div style={{ height: '200px' }}></div>
      </div>
    </div>
  );
}

export default HomePage;
