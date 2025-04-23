import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';

import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

const languages = {
  en: { nativeName: 'English' },
  vi: { nativeName: 'Tiếng Việt' },
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        slogan:
          'Your wardrobe should be as unique as you are—discover trendy, elegant, and timeless pieces made just for you.',
      },
    },
    vi: {
      translation: {
        slogan:
          'Tủ đồ của bạn nên độc đáo như chính con người bạn — khám phá những thiết kế thời thượng, thanh lịch và vượt thời gian, dành riêng cho bạn.',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

function Banner() {
  const navigate = useNavigate();

  const { container, content, title, slogan } = styles;
  const { t } = useTranslation();

  const handleDirect = () => {};
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>Sato Store Demo</h1>
        <div className={slogan}>{t('slogan')}</div>
        <div>
          {Object.keys(languages).map((lng) => (
            <button
              key={lng}
              type='submit'
              onClick={() => {
                i18n.changeLanguage(lng);
              }}
            >
              {languages[lng].nativeName}
            </button>
          ))}
        </div>
        <div onClick={() => navigate('/shop')}>
          <Button content={'Go to shop'} />
        </div>
      </div>
    </div>
  );
}

export default Banner;
