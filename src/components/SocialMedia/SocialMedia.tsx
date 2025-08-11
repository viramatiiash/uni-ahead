import { TelegramIcon, InstagramIcon, WhatsAppIcon_1 } from "@icons/index";
import styles from "@components/SocialMedia/social-media.module.scss";
import { ExternalLink } from "@components/ExpernalLink/ExternalLink";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constants/api";

const fetchContacts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/contact-infos`);
  console.log("Fetched contactInfos:", data); 
  return data;
};


export const SocialMedia = () => {
  const { data: contactInfos } = useQuery({
    queryKey: ["contact-infos"],
    queryFn: fetchContacts,
  });


  return (
    <div className={styles.socialMedia}>
      <ExternalLink
        href={contactInfos?.whatsapp}
        className={styles.iconContainer}
      >
        <WhatsAppIcon_1 className={styles.icon} />
      </ExternalLink>
      <ExternalLink
        href={contactInfos?.telegram}
        className={styles.iconContainer}
      >
        <TelegramIcon className={styles.icon} />
      </ExternalLink>
      <ExternalLink
        href={contactInfos?.instagram}
        className={styles.iconContainer}
      >
        <InstagramIcon className={styles.icon} />
      </ExternalLink>
    </div>
  );
};
