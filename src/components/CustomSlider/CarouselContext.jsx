'use client';

import { createContext, useContext } from 'react';

export const CarouselContext = createContext(null);

export const useCarousel = () => {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error(
            'useCarousel must be used within CarouselContext.Provider'
        );
    }

    return context;
};
