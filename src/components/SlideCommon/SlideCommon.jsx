import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useContext } from 'react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './styles.module.scss';
import cls from 'classnames';

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={cls(styles.customArrow, styles.leftArrow)}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

// Custom Right Arrow Component
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={cls(styles.customArrow, styles.rightArrow)}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

function SlideCommon() {
  const { detailsProduct } = useContext(SideBarContext);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {detailsProduct.images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} />
        ))}
      </Slider>
    </div>
  );
}

export default SlideCommon;
