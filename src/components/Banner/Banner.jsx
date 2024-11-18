import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
function Banner() {
  const { container, content, title, slogan } = styles;
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>Viet Wood Demo</h1>
        <div className={slogan}>
          Make your home more special this year with beautiful
        </div>
        <Button content={'Go to shop'} />
      </div>
    </div>
  );
}

export default Banner;
