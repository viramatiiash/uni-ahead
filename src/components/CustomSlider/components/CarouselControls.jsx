"use client";

import { node, string } from "prop-types";
import clsx from "clsx";
import styles from "./Carousel.module.scss";
import { useCarousel } from "../CarouselContext";

import ArrowLeftIcon from "@assets/icons/arrow-2.svg";
import ArrowRightIcon from "@assets/icons/arrow-2.svg";
import { transform } from "typescript";

export const CarouselPrevButton = ({ className, children, ...props }) => {
  const { onPrevButtonClick } = useCarousel();

  return (
    <button
      className={clsx(styles.control, styles.controlPrev, className)}
      type="button"
      onClick={onPrevButtonClick}
      aria-label="Previous slide"
      {...props}
    >
      {children ?? (
        <ArrowLeftIcon
          className={styles.arrowIcon}
          style={{ transform: "rotate(180deg)" }}
        />
      )}
    </button>
  );
};
CarouselPrevButton.propTypes = {
  className: string,
  children: node,
};

export const CarouselNextButton = ({ className, children, ...props }) => {
  const { onNextButtonClick } = useCarousel();

  return (
    <button
      className={clsx(styles.control, styles.controlNext, className)}
      type="button"
      onClick={onNextButtonClick}
      aria-label="Next slide"
      {...props}
    >
      {children ?? <ArrowRightIcon className={styles.arrowIcon} />}
    </button>
  );
};
CarouselNextButton.propTypes = {
  className: string,
  children: node,
};
