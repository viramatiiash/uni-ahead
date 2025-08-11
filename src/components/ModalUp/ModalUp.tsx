import styles from "./modal-up.module.scss";
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@assets/icons";
import throttle from "lodash.throttle";

export const ModalUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      setIsVisible(scrollTop > 200);
    }, 200);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel?.();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <HashLink smooth className={styles.link} to="#header">
      <ArrowUpIcon />
    </HashLink>
  );
};
