import React, { Suspense } from "react";
import styles from "./faq.module.scss";
import { Wave } from "@/components/Wave/Wave";
import {
  QuestionIcon_1,
  QuestionIcon_2,
  QuestionIcon_3,
  WavesIcon_1,
  WavesIcon_5,
} from "@assets/icons";
import classNames from "classnames";
import { FAQVector } from "@/utils/textVectors";
import { BlockTitle } from "@/components/BlockTitle/BlockTitle";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LazyInView } from "@/components/LazyInView/LazyInView";
import { API_BASE_URL } from "@/constants/api";

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

const Accordion = React.lazy(() =>
  import("@/components/Accordion/Accordion").then((module) => ({
    default: module.Accordion,
  }))
);

const fetchFaqItems = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/faq`);
  return data;
};

export const FAQ: React.FC = () => {
  const { data: faqItems } = useQuery({
    queryKey: ["faq-items"],
    queryFn: fetchFaqItems,
  });

  return (
    <div id="faq" className={classNames(styles.faqContainer, "wrapper")}>
      <QuestionIcon_1 className={styles.questionIcon_1} />

      <QuestionIcon_2 className={styles.questionIcon_2} />

      <QuestionIcon_3 className={styles.questionIcon_3} />

      <Wave containerClass={styles.waveContainer}>
        <WavesIcon_1 className={styles.wave} />
      </Wave>

      <div className={styles.blockTitleContainer}>
        <Suspense fallback={null}>
          <TextVector
            viewBox={FAQVector.viewBox}
            d={FAQVector.d}
            stroke={FAQVector.stroke}
            strokeWidth={FAQVector.strokeWidth}
            customClass={styles.FAQVector}
          />
        </Suspense>

        <BlockTitle text="Поширені запитання" />
      </div>

      <div className={styles.accordionContainer}>
        {faqItems && (
          <LazyInView>
            <Suspense fallback={<div>Завантаження FAQ...</div>}>
              <Accordion accordionData={faqItems} />
            </Suspense>
          </LazyInView>
        )}
      </div>
      
      <Wave containerClass={styles.waveContainerBottom}>
        <WavesIcon_5 className={styles.waveBottom} />
      </Wave>
    </div>
  );
};
