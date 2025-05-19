import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function Banner() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { container, content, title, slogan } = styles;

  const handleDirect = () => {};
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>Sato Store</h1>
        <div className={slogan}>
          Tủ đồ của bạn nên độc đáo như chính con người bạn — khám phá những
          thiết kế thời thượng, thanh lịch và vượt thời gian, dành riêng cho
          bạn.
        </div>

        <div onClick={() => navigate('/shop')}>
          <Button content={'Đi tới cửa hàng'} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
