import clsx from 'clsx';
import { string } from 'prop-types';

import styles from './Carousel.module.scss';

export const CarouselSlide = ({ className, ...props }) => {
    return <div className={clsx(styles.slide, className)} {...props} />;
};

CarouselSlide.propTypes = {
    className: string,
};
