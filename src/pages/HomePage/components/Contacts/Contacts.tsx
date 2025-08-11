import React, { Suspense } from "react";
import styles from "./contacts.module.scss";
import { BlockTitle } from "@/components/BlockTitle/BlockTitle";
import { contactsVector } from "@/utils/textVectors";
import classNames from "classnames";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { EnvelopeIcon, GlobeIcon, PhoneIcon, WavesIcon_6 } from "@assets/icons";
import { ExternalLink } from "@/components/ExpernalLink/ExternalLink";
import { Wave } from "@/components/Wave/Wave";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constants/api";

const fetchContacts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/contact-infos`);
  console.log("Fetched contactInfos:", data);
  return data;
};

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

export const Contacts = () => {
  const { data: contactInfos } = useQuery({
    queryKey: ["contact-infos"],
    queryFn: fetchContacts,
  });

  const isTablet = useMediaQuery({ query: "(min-width: 600px)" });

  if (!contactInfos) return null;

  return (
    <div
      id="contacts"
      className={classNames(styles.contacts, isTablet && "wrapper")}
    >
      <div className={styles.blockTitleContainer}>
        <Suspense fallback={null}>
          <TextVector
            viewBox={contactsVector.viewBox}
            d={contactsVector.d}
            stroke={contactsVector.stroke}
            strokeWidth={contactsVector.strokeWidth}
            customClass={styles.contactsVector}
          />
        </Suspense>

        <BlockTitle text="Контакти" />
      </div>

      <div className={styles.contactsContent}>
        <ContactForm />

        <div className={styles.contactDataContainer}>
          <h3 className={styles.contactTitle}>Або сконтактуй з нами: </h3>

          <div className={styles.dataContentContainer}>
            <div className={styles.contactData}>
              <EnvelopeIcon className={styles.icon} />

              <h4 className={styles.contactDataTitle}>Через імейл:</h4>

              <ExternalLink
                className={styles.data}
                href={contactInfos.emailLink}
              >
                {contactInfos.emailText}
              </ExternalLink>

              <div className={styles.divider}></div>
            </div>
            <div className={styles.contactData}>
              <GlobeIcon className={styles.icon} />

              <h4 className={styles.contactDataTitle}>У соцмережах:</h4>

              <ExternalLink
                href={contactInfos.telegram}
                className={styles.data}
              >
                Telegram
              </ExternalLink>

              <ExternalLink
                href={contactInfos.whatsapp}
                className={styles.data}
              >
                WhatsApp
              </ExternalLink>

              <ExternalLink
                href={contactInfos.instagram}
                className={styles.data}
              >
                Instagram
              </ExternalLink>

              <div className={styles.divider}></div>
            </div>
            <div className={styles.contactData}>
              <PhoneIcon
                className={classNames(styles.icon, styles.iconPhone)}
              />

              <h4 className={styles.contactDataTitle}>Подзвони:</h4>

              <ExternalLink
                className={styles.data}
                href={contactInfos.phoneLink}
              >
                {contactInfos.phoneText}
              </ExternalLink>

              <p className={styles.description}>
                *якщо ти знаходишся на території Австрії
              </p>
            </div>
          </div>
        </div>
      </div>

      <Wave containerClass={styles.waveContainer}>
        <WavesIcon_6 className={styles.wave} />
      </Wave>
    </div>
  );
};
