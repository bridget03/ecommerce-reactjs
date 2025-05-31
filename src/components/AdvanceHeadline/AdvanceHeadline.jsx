import MainLayout from '@components/Layout/Layout.jsx';
import styles from './styles.module.scss';

function AdvanceHeadline() {
  const { container, headline, containerMiddleBox, des, title } = styles;
  return (
    <MainLayout>
      <div className={container}>
        <div className={headline}></div>

        <div className={containerMiddleBox}>
          <p className={des}>Đừng bỏ lỡ những ưu đãi của chúng tôi</p>
          <p className={title}>Sản phẩm nổi bật</p>
        </div>
        <div className={headline}></div>
      </div>
    </MainLayout>
  );
}

export default AdvanceHeadline;
