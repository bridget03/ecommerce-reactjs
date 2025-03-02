import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  const { container, content, title, slogan } = styles;
  const handleDirect = () => {};
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>Viet Wood Demo</h1>
        <div className={slogan}>
          Make your home more special this year with beautiful
        </div>
        <div onClick={() => navigate('/shop')}>
          <Button content={'Go to shop'} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
