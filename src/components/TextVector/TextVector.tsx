import React, { useEffect, useRef, useState } from "react";
import styles from "./text-vector.module.scss";
import { TextVectorProps } from "@/interfaces/textVectorProps.types";
import classNames from "classnames";

export const TextVector: React.FC<TextVectorProps> = React.memo(
  ({ viewBox, d, stroke, strokeWidth, customClass }) => {
    const ref = useRef<SVGSVGElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.5 }
      );

      if (ref.current) observer.observe(ref.current);

      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, []);

    return (
      <svg
        ref={ref}
        className={classNames(
          styles.textVector,
          customClass,
          visible && styles.visible
        )}
        viewBox={viewBox}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
);
