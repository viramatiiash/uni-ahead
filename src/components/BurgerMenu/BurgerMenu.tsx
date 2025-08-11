import classNames from "classnames";
import styles from "./BurgerMenu.module.scss";
import { headerNavigation } from "@/utils/headerNavigation";
import { Navigation } from "@components/Navigation/Navigation";
import { CrossIcon } from "@assets/icons";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';

export const BurgerMenu = ({ isBurgerOpen, setIsBurgerOpen }) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isBurgerOpen) {
      timeoutRef.current = setTimeout(() => {
        document.body.style.overflow = "hidden";
      }, 300);
    } else {
      clearTimeout(timeoutRef.current);
      document.body.style.overflow = "auto";
    }

    return () => {
      clearTimeout(timeoutRef.current);
      document.body.style.overflow = "auto";
    };
  }, [isBurgerOpen]);
    
  return (
    <>
      <div className={classNames(styles.menu, { [styles.open]: isBurgerOpen })}>
        <Button
          className={styles.closeButton}
          variant='burger'
          onClick={() => setIsBurgerOpen(false)}
        >
          <CrossIcon className={styles.closeIcon} />
        </Button>

        <Navigation
          linksArray={headerNavigation}
          navStyles={styles.navigation}
          linkStyles={styles.link}
          onClick={() => setIsBurgerOpen(false)}
        />

        <SocialMedia />
      </div>
    </>
  );
};
