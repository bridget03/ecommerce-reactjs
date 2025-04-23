import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';

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
        featureProduct: 'Our featured products',
      },
    },
    vi: {
      translation: {
        featureProduct: 'Sản phẩm nổi bật',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
function AdvanceHeadline() {
  const { container, headline, containerMiddleBox, des, title } = styles;
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className={container}>
        <div className={headline}></div>
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
        <div className={containerMiddleBox}>
          <p className={des}>Don't miss super offers</p>
          <p className={title}>{t('featureProduct')}</p>
        </div>
        <div className={headline}></div>
      </div>
    </MainLayout>
  );
}

export default AdvanceHeadline;
