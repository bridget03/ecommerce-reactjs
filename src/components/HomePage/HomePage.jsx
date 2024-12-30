import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Banner from '@components/Banner/Banner.jsx';
import Info from '@components/Info/Info.jsx';
import AdvanceHeadline from '@components/AdvanceHeadline/AdvanceHeadline.jsx';
import HeadlineListProduct from '@components/HeadlineListProduct/HeadlineListProduct.jsx';
import { getProduct } from '../../apis/productService';
import { useEffect, useState } from 'react';
function HomePage() {
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    getProduct().then((res) => {
      setListProducts(res.contents);
    });
  }, []);

  console.log(listProducts, 'listProducts');

  return (
    <div>
      <div>
        <Header />
        <Banner />
        <Info />
        <AdvanceHeadline />
        <HeadlineListProduct data={listProducts.slice(0, 12)} />
        <div style={{ height: '200px' }}></div>
      </div>
    </div>
  );
}

export default HomePage;
