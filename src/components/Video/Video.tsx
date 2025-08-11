import React, { useEffect, useState } from "react";
import styles from "./video.module.scss";
import { Button } from '../Button/Button';

interface VideoProps {
  src: string;
}

export const Video: React.FC<VideoProps> = ({ src }) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "accepted") {
      setIsAllowed(true);
    }

    const onConsentChange = () => {
      const updated = localStorage.getItem("cookieConsent");
      if (updated === "accepted") {
        setIsAllowed(true);
      }
    };

    window.addEventListener("cookieConsentChanged", onConsentChange);
    return () =>
      window.removeEventListener("cookieConsentChanged", onConsentChange);
  }, []);

  if (!isAllowed) {
    return (
      <div className={styles.videoPlaceholder}>
        <p className={styles.placeholderText}>
          Щоб переглянути відео, потрібно дати згоду на використання cookie.
        </p>
        <Button
          onClick={() => {
            localStorage.setItem("cookieConsent", "accepted");
            window.dispatchEvent(new Event("cookieConsentChanged"));
          }}
        >
          Прийняти кукі
        </Button>
      </div>
    );
  }

  return (
    <iframe
      className={styles.video}
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};
