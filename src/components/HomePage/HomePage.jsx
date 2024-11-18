import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Banner from '@components/Banner/Banner.jsx';
import styles from './styles.module.scss';
function HomePage() {
  const { container } = styles;
  return (
    <div>
      <div className='container'>
        <Header />
        <Banner />
      </div>
    </div>
  );
}

export default HomePage;
