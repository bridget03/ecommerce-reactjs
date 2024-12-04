import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';
function OurShop() {
  const { container, functionBox } = styles;
  return (
    <>
      <Header />
      <MainLayout>
        <div className={container}>
          <div className={functionBox}>
            <div>Home &gt; Shop</div>
            <div>&lt; Return to previous page</div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default OurShop;
