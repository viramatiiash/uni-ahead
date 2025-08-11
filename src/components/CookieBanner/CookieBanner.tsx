import { useEffect, useState } from "react";
import styles from "./CookieBanner.module.scss";
import { Button } from "../Button/Button";
import { CookiesIcon } from "@assets/icons";

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("cookieConsent", accepted ? "accepted" : "rejected");
    setVisible(false);
    window.dispatchEvent(new Event("cookieConsentChanged"));
  };

  if (!visible) return null;

  return (
    <div className={styles.cookieBanner}>
      <CookiesIcon className={styles.icon} />

      <p className={styles.cookieBannerText}>
        Ми використовуємо файли <span className={styles.boldText}>cookie</span>{" "}
        для поліпшення вашого досвіду. Натисніть{' '}
        <span className={styles.boldText}>«Прийняти»</span>, щоб дозволити
        використання аналітики та стороннього контенту.
      </p>

      <div className={styles.buttons}>
        <Button variant="success" onClick={() => handleConsent(true)}>
          Прийняти
        </Button>

        <Button variant="error" onClick={() => handleConsent(false)}>
          Відхилити
        </Button>
      </div>
    </div>
  );
};
