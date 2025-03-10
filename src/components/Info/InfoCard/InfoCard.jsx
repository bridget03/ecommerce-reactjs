import styles from '../styles.module.scss';
import deliverIcon from '@icons/svg/deliverIcon.svg';

function InfoCard({ content, description, src }) {
  const { containerCard, containerContent, title, des } = styles;
  return (
    <div className={containerCard}>
      <img
        width={40}
        height={41}
        src={src}
        className={styles.svg}
        alt='containerCardIcon'
      />
      <div className={containerContent}>
        <div className={title}>{content}</div>
        <div className={des}>{description}</div>
      </div>
    </div>
  );
}

export default InfoCard;
