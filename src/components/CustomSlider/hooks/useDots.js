'use client';

import { useCallback, useEffect, useState } from 'react';

export const useDots = (api) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onDotButtonClick = useCallback(
        (index) => {
            if (!api) return;

            api.scrollTo(index);
        },
        [api]
    );

    const onInit = useCallback((emblaApi) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;

        const onInit = () => {
            setScrollSnaps(api.scrollSnapList());
        };

        const onSelect = () => {
            setSelectedIndex(api.selectedScrollSnap());
        };

        onInit(api);
        onSelect(api);

        api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
    }, [api, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    };
};
