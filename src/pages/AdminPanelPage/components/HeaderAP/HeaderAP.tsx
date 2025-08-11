import classNames from "classnames";
import styles from "./HeaderAP.module.scss";
import { Logo } from "@/components/Logo/Logo";
import { InternalLink } from "@/components/InternalLink/InternalLink";
import { ArrowIcon_2 } from "@assets/icons";

export const HeaderAP = () => {
  return (
    <header className={classNames(styles.header)}>
      <div className={styles.container}>
        <Logo logoClass={styles.logo} />

        <InternalLink className={styles.breadcrumbLink} to="/">
          <ArrowIcon_2 className={styles.breadcrumbArrow} />

          <span className={styles.breadcrumb}>На головну</span>
        </InternalLink>
      </div>
    </header>
  );
};
