import BoxIcon from './BoxIcon/BoxIcon';
import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.png';
import reloadIcon from '@icons/svg/reloadIcon.svg';
import heartIcon from '@icons/svg/heartIcon.svg';
import cartIcon from '@icons/svg/cartIcon.svg';
function Header() {
  const {
    containerBoxIcon,
    containerMenu,
    containerHeader,
    containerBox,
    container,
  } = styles;
  return (
    <div className={container}>
      <div className={containerHeader}>
        <div className={containerBox}>
          <div className={containerBoxIcon}>
            {dataBoxIcon.map((item) => {
              return <BoxIcon type={item.type} href={item.href} />;
            })}
          </div>
          <div className={containerMenu}>
            {dataMenu.slice(0, 3).map((item) => {
              return <Menu content={item.content} href={item.href}></Menu>;
            })}
          </div>
        </div>
        <div>
          <img
            src={Logo}
            alt='Logo'
            style={{ width: '200px', height: '83px' }}
          />
        </div>
        <div className={containerBox}>
          <div className={containerMenu}>
            {dataMenu.slice(3, dataMenu.length).map((item) => {
              return <Menu content={item.content} href={item.href}></Menu>;
            })}
          </div>
          <div className={containerBoxIcon}>
            <img width={26} height={26} src={reloadIcon} alt='reloadIcon' />
            <img width={26} height={26} src={heartIcon} alt='heartIcon' />
            <img width={26} height={26} src={cartIcon} alt='cartIcon' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
