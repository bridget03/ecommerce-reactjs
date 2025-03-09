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
        <h1 className={title}>Sato Store Demo</h1>
        <div className={slogan}>
          Your wardrobe should be as unique as you are—discover trendy, elegant,
          and timeless pieces made just for you.
        </div>
        <div onClick={() => navigate('/shop')}>
          <Button content={'Go to shop'} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
