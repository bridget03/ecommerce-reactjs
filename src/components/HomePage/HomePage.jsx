import Header from '@components/Header/Header.jsx';
import Banner from '@components/Banner/Banner.jsx';
import SaleHomePage from '@components/SaleHomePage/SaleHomePage.jsx';
import Info from '@components/Info/Info.jsx';
import AdvanceHeadline from '@components/AdvanceHeadline/AdvanceHeadline.jsx';
import HeadlineListProduct from '@components/HeadlineListProduct/HeadlineListProduct.jsx';
import Footer from '@components/Footer/Footer.jsx';
import { getProduct } from '@apis/productService';
import { useEffect, useState } from 'react';
function HomePage() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const query = {
      sortType: 0,
      page: 1,
      limit: 10,
    };

    getProduct(query).then((res) => {
      setListProducts(res.contents);
    });
  }, []);

  return (
    <div>
      <div>
        <Header />
        <Banner />
        <Info />
        <AdvanceHeadline />
        <HeadlineListProduct data={listProducts.slice(0, 12)} />
        <SaleHomePage />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
