import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';
function AdvanceHeadline() {
  const { container, headline, containerMiddleBox, des, title } = styles;
  return (
    <MainLayout>
      <div className={container}>
        <div className={headline}></div>
        <div className={containerMiddleBox}>
          <p className={des}>Don't miss super offers</p>
          <p className={title}>Our featured products</p>
        </div>
        <div className={headline}></div>
      </div>
    </MainLayout>
  );
}

export default AdvanceHeadline;
