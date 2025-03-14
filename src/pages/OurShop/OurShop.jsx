import styles from './styles.module.scss';
import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import Footer from '@components/Footer/Footer.jsx';

import Banner from '@/pages/OurShop/components/Banner.jsx';
import Filter from '@pages/OurShop/components/Filter';
import { OurShopProvider } from '@contexts/OurShopProvider';

import { useNavigate } from 'react-router-dom';
import ListProduct from '@pages/OurShop/components/ListProduct';
function OurShop() {
  const navigate = useNavigate();
  const { container, functionBox } = styles;
  const handleBackPreviousPage = () => {
    navigate(-1);
  };
  return (
    <OurShopProvider>
      <Header />
      <MainLayout>
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
              &lt; Return to previous page
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
