import MainLayout from '@components/Layout/Layout.jsx';
import { dataInfo } from './constants';
import InfoCard from './InfoCard/InfoCard.jsx';
import styles from './styles.module.scss';
function Info() {
  const { container } = styles;
  return (
    <div>
      <MainLayout>
        <div className={container}>
          {dataInfo.map((item) => {
            return <InfoCard />;
          })}
        </div>
      </MainLayout>
    </div>
  );
}

export default Info;
