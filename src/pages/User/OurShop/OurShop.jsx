import styles from './styles.module.scss';
import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import Footer from '@components/Footer/Footer.jsx';

import Banner from '@/pages/User/OurShop/components/Banner.jsx';
import Filter from '@pages/User/OurShop/components/Filter';
import { OurShopProvider } from '@contexts/OurShopProvider';

import { useNavigate } from 'react-router-dom';
import ListProduct from '@pages/User/OurShop/components/ListProduct';
function OurShop() {
  const navigate = useNavigate();
  const { container, functionBox } = styles;
  const handleBackPreviousPage = () => {
    navigate(-1);
  };
  return (
    <OurShopProvider>
      <MainLayout>
        <Header />
        <div className={container}>
          <div className={functionBox}>
            <div>
              <span
                onClick={() => navigate('/')}
                className={styles.backNavigate}
              >
                Home
              </span>{' '}
              &gt; Shop
            </div>
            <div
              className={styles.backNavigate}
              onClick={handleBackPreviousPage}
            >
              &lt; Trở về trang trước
            </div>
          </div>
        </div>
        <Banner />
        <Filter />
        <ListProduct />
      </MainLayout>
      <Footer />
    </OurShopProvider>
  );
}

export default OurShop;
