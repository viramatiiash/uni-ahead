import React from "react";
import styles from "./team-member-card.module.scss";

export interface CardData {
  bgImg: string;
  name: string;
  position: string;
  description: string;
}

export const TeamMemberCard: React.FC<CardData> = React.memo(
  ({ bgImg, name, position, description }) => {
    return (
      <div className={styles.card} style={{ backgroundImage: `url(${bgImg})` }}>
        <div className={styles.gradient}>
          <h3 className={styles.name}>{name}</h3>
          <h4 className={styles.position}>{position}</h4>
          <div className={styles.divider}></div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    );
  }
);
