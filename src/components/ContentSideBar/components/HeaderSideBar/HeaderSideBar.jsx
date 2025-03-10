import styles from './styles.module.scss';

function HeaderSideBar({ icon, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default HeaderSideBar;
