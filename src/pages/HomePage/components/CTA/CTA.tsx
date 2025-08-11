import React, { Suspense } from 'react';
import styles from './cta.module.scss';
import { Wave } from '@/components/Wave/Wave';
import {
  WavesIcon_1,
  WavesIcon_6,
} from '@assets/icons';
import { InternalLink } from '@/components/InternalLink/InternalLink';
import classNames from 'classnames';
import { CTAVector } from '@/utils/textVectors';
const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);



export const CTA: React.FC = () => {
  return (
    <div className={classNames(styles.ctaContainer, "wrapper")}>
      <Wave containerClass={styles.waveContainer}>
        <WavesIcon_6 className={styles.wave} />
      </Wave>

      <div className={styles.textContainer}>
        <h4 className={styles.ctaTitle}>
          Ти{" "}
          <span className={styles.span}>
            <Suspense fallback={null}>
              <TextVector
                viewBox={CTAVector.viewBox}
                d={CTAVector.d}
                stroke={CTAVector.stroke}
                strokeWidth={CTAVector.strokeWidth}
                customClass={styles.ctaVector}
              />
            </Suspense>{" "}
            все ще
          </span>{" "}
          не навчаєшся?
        </h4>

        <p className={styles.ctaText}>Гайда до нас:</p>

        <InternalLink to="#contacts" className={styles.link}>
          <span className={styles.linkSpan}>Зв'язатися з нами</span>
        </InternalLink>
      </div>
      
      <div className={styles.emptyContainer}></div>
      <Wave containerClass={styles.waveContainerBottom}>
        <WavesIcon_1 className={styles.waveBottom} />
      </Wave>
    </div>
  );
};
