import React from 'react';
import styles from './testimonials-card.module.scss';
import {
  QuotesIcon,
  StarFilledIcon,
  StarOutlinedIcon,
  WavesIcon_2,
  WavesIcon_6,
} from '@assets/icons';
import { Wave } from '@/components/Wave/Wave';
import { TestimonialType } from '@/pages/AdminPanelPage/components/TestimonialsAP/TestimonialsAP';


export const TestimonialsCard: React.FC<{ cardData: TestimonialType }> = ({
  cardData,
}) => {

  const filledStars = cardData.stars ?? 0;
  const emptyStars = Math.max(0, 5 - filledStars);

  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {[...Array(filledStars)].map((_, i) => (
          <StarFilledIcon key={`filled-${i}`} className={styles.filledStar} />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutlinedIcon key={`empty-${i}`} className={styles.emptyStar} />
        ))}
      </div>
      <QuotesIcon className={styles.icon} />
      <p className={styles.description}>{cardData.text}</p>
      <h3 className={styles.name}>{cardData.name}</h3>
      <Wave containerClass={styles.waveContainer}>
        <WavesIcon_6 className={styles.wave} />
      </Wave>
    </div>
  );
};
