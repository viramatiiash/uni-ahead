import { BurgerIcon } from "@assets/icons";
import styles from "./page-burger.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { PageBurgerModal } from "./components/PageBurgerModal";

interface BurgerLink {
  title: string;
  link: string;
  highlighted?: boolean;
}

interface PageBurgerProps {
  linksArray: BurgerLink[];
  activeSection?: string | number;
  setActiveSection?: (section: string) => void;
  alwaysVisible?: boolean;
}

export const PageBurger = React.memo(
  ({
    linksArray,
    activeSection,
    setActiveSection,
    alwaysVisible = false,
  }: PageBurgerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(alwaysVisible);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (!alwaysVisible) {
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll, true);
      }
    }, [alwaysVisible]);

    const listenToScroll = () => {
      let heightToShowFrom = 0;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      setHeight(winScroll);

      if (winScroll > heightToShowFrom) {
        !isVisible && setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <>
        {isVisible && (
          <div
            className={`${styles.pageBurgerModalContainer} ${
              isOpen ? styles.active : ""
            }`}
            onClick={!isOpen ? handleOpen : handleClose}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={styles.pageBurgerContainer}>
              <BurgerIcon className={styles.pageBurger} />
            </div>

            <div
              ref={modalRef}
              className={`${styles.modalWrapper} ${
                isOpen ? styles.open : styles.closed
              }`}
            >
              <PageBurgerModal
                linksArray={linksArray}
                onClick={handleClose}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>
          </div>
        )}
      </>
    );
  }
);
