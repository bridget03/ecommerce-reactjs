import MainLayout from '@components/Layout/Layout.jsx';
import { dataInfo } from './constants';
import InfoCard from './InfoCard/InfoCard.jsx';
import styles from './styles.module.scss';
function Info() {
  return (
    <div>
      <MainLayout>
        <div className={styles.container}>
          <div className={styles.bgOverlay}></div>
          {dataInfo.map((item) => {
            return (
              <InfoCard
                content={item.title}
                description={item.description}
                src={item.src}
              />
            );
          })}
        </div>
      </MainLayout>
    </div>
  );
}

export default Info;
