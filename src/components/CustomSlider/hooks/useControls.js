'use client';

import { useCallback, useEffect, useState } from 'react';

export const useControls = (api) => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!api) return;

        api.scrollPrev();
    }, [api]);

    const onNextButtonClick = useCallback(() => {
        if (!api) return;

        api.scrollNext();
    }, [api]);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setPrevBtnDisabled(!api.canScrollPrev());
            setNextBtnDisabled(!api.canScrollNext());
        };

        onSelect();
        api.on('reInit', onSelect).on('select', onSelect);
    }, [api]);

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    };
};
