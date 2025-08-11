import styles from "./testimonials.module.scss";
import { BlockTitle } from "@/components/BlockTitle/BlockTitle";
import { testimonialsVector } from "@/utils/textVectors";
import { LazyInView } from "@/components/LazyInView/LazyInView";
import React, { Suspense } from "react";

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

const TestimonialsSlider = React.lazy(() =>
  import("./components/TestimonialsSlider/TestimonialsSlider").then(
    (module) => ({
      default: module.TestimonialsSlider,
    })
  )
);

export const Testimonials = () => {
  return (
    <div className={styles.testimonials}>
      <div id="testimonials" className={styles.blockTitleContainer}>
        <Suspense fallback={null}>
          <TextVector
            viewBox={testimonialsVector.viewBox}
            d={testimonialsVector.d}
            stroke={testimonialsVector.stroke}
            strokeWidth={testimonialsVector.strokeWidth}
            customClass={styles.testimonialsVector}
          />
        </Suspense>

        <BlockTitle text="Відгуки" />
      </div>

      <p className={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      
      <LazyInView>
        <Suspense fallback={<div>Завантаження FAQ...</div>}>
          <TestimonialsSlider />
        </Suspense>
      </LazyInView>
    </div>
  );
};
