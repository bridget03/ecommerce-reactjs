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
        <h1 className={title}>Sato Store Demo</h1>
        <div className={slogan}>{t('slogan')}</div>
        <div>
          {/* {Object.keys(languages).map((lng) => (
            <button
              key={lng}
              type='submit'
              onClick={() => {
                i18n.changeLanguage(lng);
              }}
            >
              {languages[lng].nativeName}
            </button>
          ))} */}
          <button onClick={() => i18n.changeLanguage('vi')}>VI</button>
          <button onClick={() => i18n.changeLanguage('en')}>EN</button>
        </div>
        <div onClick={() => navigate('/shop')}>
          <Button content={'Go to shop'} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
