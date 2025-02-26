import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import { IoIosHeartEmpty } from 'react-icons/io';

function WishList() {
  return (
    <div>
      <HeaderSideBar icon={<IoIosHeartEmpty />} title={'Wish list'} />
    </div>
  );
}

export default WishList;
