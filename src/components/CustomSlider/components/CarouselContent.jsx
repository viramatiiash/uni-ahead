'use client';
import clsx from 'clsx';
import styles from './Carousel.module.scss';
import { node, string } from 'prop-types';
import { useCarousel } from '../CarouselContext';

export const CarouselContent = ({
    containerClassName,
    viewportClassName,
    ...props
}) => {
    const { carouselRef } = useCarousel();

    return (
        <div
            ref={carouselRef}
            className={clsx(styles.viewport, viewportClassName)}
        >
            <div
                className={clsx(styles.container, containerClassName)}
                {...props}
            />
        </div>
    );
};

CarouselContent.propTypes = {
    containerClassName: string,
    viewportClassName: string,
    children: node.isRequired,
};
