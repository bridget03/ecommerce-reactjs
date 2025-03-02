import styles from './styles.module.scss';
import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';

import Banner from '@/pages/OurShop/components/Banner.jsx';
import Filter from '@pages/OurShop/components/Filter';
import { OurShopProvider } from '@contexts/OurShopProvider';

import { useNavigate } from 'react-router-dom';
function OurShop() {
  const navigate = useNavigate();
  const { container, functionBox } = styles;
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
            <div className={styles.backNavigate} onClick={() => navigate('/')}>
              &lt; Return to previous page
            </div>
          </div>
        </div>
        <Banner />
        <Filter />
      </MainLayout>
    </OurShopProvider>
  );
}

export default OurShop;
