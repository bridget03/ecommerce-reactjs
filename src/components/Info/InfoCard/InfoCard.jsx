import styles from '../styles.module.scss';
import deliverIcon from '@icons/svg/deliverIcon.svg';

function InfoCard() {
  const { containerCard } = styles;
  return (
    <div className={containerCard}>
      <img width={40} height={41} src={deliverIcon} alt='TruckIcon' />
      <div>
        <span>Fastest Shipping</span>
        <p>Order at $39</p>
      </div>
    </div>
  );
}

export default InfoCard;
