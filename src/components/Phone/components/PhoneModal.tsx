import styles from './phone-modal.module.scss';
import { ExternalLink } from '@/components/ExpernalLink/ExternalLink';
import {
  InstagramIcon,
  ModalArrowVector,
  PhoneIcon,
  TelegramIcon,
  WhatsAppIcon_1,
} from '@assets/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from "@/constants/api";

const fetchContacts = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/contact-infos`);
  console.log("Fetched contactInfos:", data);
  return data;
};

export const PhoneModal = () => {
  const { data: contactInfos } = useQuery({
    queryKey: ["contact-infos"],
    queryFn: fetchContacts,
  });

  if (!contactInfos) return null;

  return (
    <div className={styles.phoneModalOverlay}>
      <div className={styles.phoneModal}>
        <h4 className={styles.title}>Зв'яжись з нами:</h4>
        <div className={styles.contactMethods}>
          <ExternalLink href={contactInfos.whatsapp} className={styles.link}>
            <WhatsAppIcon_1 className={styles.icon} />
            WhatsApp
          </ExternalLink>
          <ExternalLink href={contactInfos.instagram} className={styles.link}>
            <InstagramIcon className={styles.icon} />
            Instagram
          </ExternalLink>
          <ExternalLink href={contactInfos.telegram} className={styles.link}>
            <TelegramIcon className={styles.icon} />
            Telegram
          </ExternalLink>
          <ExternalLink href={contactInfos.phoneLink} className={styles.link}>
            <PhoneIcon className={styles.icon} />
            <div className={styles.phoneNumber}>{contactInfos.phoneText}</div>
          </ExternalLink>
          <div className={styles.warning}>
            <span className={styles.warningText}>
              *якщо ти знаходишся на території Австрії
            </span>
            <ModalArrowVector className={styles.arrowVector} />
          </div>
        </div>
      </div>
    </div>
  );
};
