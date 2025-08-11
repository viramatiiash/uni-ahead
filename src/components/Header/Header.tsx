import classNames from "classnames";
import styles from "@components/Header/header.module.scss";
import { headerNavigation } from "@/utils/headerNavigation";

import { Logo } from "@components/Logo/Logo";
import { Navigation } from "@components/Navigation/Navigation";
import { SocialMedia } from "@components/SocialMedia/SocialMedia";
import { Button } from "../Button/Button";
import { BurgerIcon } from "@assets/icons";
import { useState } from 'react';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';


export const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <div id="header" className={classNames(styles.header, "wrapper")}>
      <div className={styles.logoContainer}>
        <Logo logoClass={styles.logo} />
      </div>
      <div className={styles.navigationContainer}>
        <Navigation
          linksArray={headerNavigation}
          navStyles={styles.navigation}
          linkStyles={styles.link}
        />
      </div>
      <div className={styles.socialMediaContainer}>
        <SocialMedia />
      </div>

      <Button
        className={styles.burgerButton}
        variant="burger"
        onClick={() => setIsBurgerOpen(true)}
      >
        <BurgerIcon className={styles.burger} />
      </Button>

      <BurgerMenu
        isBurgerOpen={isBurgerOpen}
        setIsBurgerOpen={setIsBurgerOpen}
      />
    </div>
  );
};
