import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer/Footer.jsx';
import Banner from '@components/Banner/Banner.jsx';
import Info from '@components/Info/Info.jsx';
import AdvanceHeadline from '@components/AdvanceHeadline/AdvanceHeadline.jsx';
import styles from './styles.module.scss';
function HomePage() {
  const { container } = styles;
  return (
    <div>
      <div className='container'>
        <Header />
        <Banner />
        <Info />
        <AdvanceHeadline />
      </div>
    </div>
  );
}

export default HomePage;
