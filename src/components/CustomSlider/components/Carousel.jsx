
import clsx from 'clsx';
import styles from './Carousel.module.scss';
import useEmblaCarousel from 'embla-carousel-react';

import { useEffect } from 'react';
import { useControls } from '../hooks/useControls';
import { CarouselContext } from '../CarouselContext';
import { array, func, node, object, string } from 'prop-types';

export const Carousel = ({
    mode = 'light',
    options = {},
    plugins,
    setApi,
    className,
    children,
    ...props
}) => {
    const [carouselRef, api] = useEmblaCarousel(
        { loop: true, ...options },
        plugins
    );
    const { onPrevButtonClick, onNextButtonClick } = useControls(api);

    // Gets an instance of the carousel API
    useEffect(() => {
        if (!api || !setApi) return;

        setApi(api);
    }, [api, setApi]);

    const value = {
        carouselRef,
        api,
        onPrevButtonClick,
        onNextButtonClick,
    };

    return (
        <CarouselContext.Provider value={value}>
            <div
                className={clsx(styles.carousel, styles[mode], className)}
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

Carousel.propTypes = {
    mode: string,
    options: object,
    plugins: array,
    setApi: func,
    className: string,
    children: node.isRequired,
};
