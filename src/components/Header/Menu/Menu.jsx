import styles from '../styles.module.scss';
function Menu({ content, href, setIsOpen }) {
  return (
    <div className={styles.menu} onClick={() => setIsOpen(true)}>
      {content}
    </div>
  );
}

export default Menu;
