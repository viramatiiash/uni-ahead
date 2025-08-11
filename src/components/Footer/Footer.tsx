import classNames from "classnames";
import styles from "@components/Footer/Footer.module.scss";
import { footerNavigation } from "@/utils/footerNavigation";

import { Logo } from "@components/Logo/Logo";
import { Navigation } from "@components/Navigation/Navigation";
import {
  EnvelopeIcon,
  InstagramIcon,
  LockIcon,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon_1,
} from "@assets/icons";
import { LinkWithIcon } from "../LinkWithIcon/LinkWithIcon";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from '@/constants/api';

const fetchContacts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/contact-infos`);
  console.log("Fetched contactInfos:", data);
  return data;
};

export const Footer = () => {
  const { data: contactInfos } = useQuery({
    queryKey: ["contact-infos"],
    queryFn: fetchContacts,
  });

  if (!contactInfos) return null;

  return (
    <div className={classNames(styles.footer, "wrapper")}>
      <div className={styles.contentContainer}>
        <div className={styles.logoContainer}>
          <Logo logoClass={styles.logo} />
        </div>

        <div className={styles.linksContainer}>
          <div className={styles.privacyLinkContainer}>
            <LinkWithIcon
              isInternal={true}
              Icon={LockIcon}
              link="/privacy-policy"
              linkText="Політика конфіденційності"
            />
          </div>

          <div className={styles.socialMediaContainer}>
            <LinkWithIcon
              isInternal={false}
              Icon={WhatsAppIcon_1}
              link={contactInfos.whatsapp}
              linkText="WhatsApp"
            />

            <LinkWithIcon
              isInternal={false}
              Icon={TelegramIcon}
              link={contactInfos.telegram}
              linkText="Telegram"
            />

            <LinkWithIcon
              isInternal={false}
              Icon={InstagramIcon}
              link={contactInfos.instagram}
              linkText="Instagram"
            />
          </div>

          <div className={styles.phoneLinkContainer}>
            <LinkWithIcon
              isInternal={false}
              Icon={PhoneIcon}
              link={contactInfos.phoneLink}
              linkText={contactInfos.phoneText}
            />
          </div>

          <LinkWithIcon
            isInternal={false}
            Icon={EnvelopeIcon}
            link={contactInfos.emailLink}
            linkText={contactInfos.emailText}
          />
        </div>

        <div className={styles.navigationContainer}>
          <Navigation
            linksArray={footerNavigation}
            navStyles={styles.navigation}
            linkStyles={styles.link}
          />
        </div>
      </div>
    </div>
  );
};
