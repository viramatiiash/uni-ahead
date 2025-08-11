import React, { useState, useEffect, useRef } from "react";
import styles from "./accordion.module.scss";
import classNames from "classnames";
import { ArrowIcon_2 } from "@assets/icons";

interface AccordionProps {
  accordionData: {
    _id: string;
    title: string;
    description: string;
    accordionIcon?: any;
  }[];
}

const TextEditorRenderer = React.lazy(() =>
  import("../TextEditor/TextEditorRenderer/TextEditorRenderer").then(
    (module) => ({
      default: module.TextEditorRenderer,
    })
  )
);

export const Accordion = ({ accordionData }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    setOpenId(null);
  }, [accordionData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target as Node)
      ) {
        setOpenId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.accordion} ref={accordionRef}>
      <div className={styles.itemsWrapper}>
        {accordionData.slice(0, 10).map((data, index) => (
          <div
            key={data._id}
            className={styles.accordionItem}
            onClick={() => toggleAccordion(data._id)}
          >
            <div
              className={classNames(
                styles.accordionTitleContainer,
                data.accordionIcon && styles.accordionTitleWithIconContainer,
                openId === data._id && styles.active
              )}
            >
              <h5 className={styles.accordionTitle}>
                {data.accordionIcon && (
                  <img
                    src={data.accordionIcon}
                    alt="icon"
                    className={styles.accordionIcon}
                  />
                )}
                {!data.accordionIcon && (
                  <span>{index + 1}.</span>
                )}

                <span>{data.title}</span>
              </h5>

              <ArrowIcon_2
                className={classNames(
                  styles.arrowIcon,
                  openId === data._id && styles.expand
                )}
              />
            </div>

            <div
              className={classNames(
                styles.accordionAnswer,
                openId === data._id && styles.open
              )}
            >
              <TextEditorRenderer value={data.description} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
