import Header from '@components/Header/Header.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import Footer from '@components/Footer/Footer.jsx';
import styles from './styles.module.scss';
function AboutUs() {
  return (
    <div className={styles.container}>
      <Header />
      <MainLayout>
        <h1>About Us</h1>
        <p>Our company is the best in the world</p>
      </MainLayout>
      <Footer />
    </div>
  );
}

export default AboutUs;
