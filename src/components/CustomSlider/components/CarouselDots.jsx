"use client";

import { useDots } from "../hooks/useDots";
import { useCarousel } from "../CarouselContext";

import styles from "./Carousel.module.scss";
import classNames from "classnames";

export const CarouselDots = ({ className }) => {
  const { api } = useCarousel();
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDots(api);

  return (
    <div className={classNames(styles.dots, className)}>
      {scrollSnaps.map((snap, i) => (
        <button
          key={snap}
          className={classNames(
            styles.dot,
            i === selectedIndex && styles.active
          )}
          onClick={() => onDotButtonClick(i)}
        />
      ))}
    </div>
  );
};
