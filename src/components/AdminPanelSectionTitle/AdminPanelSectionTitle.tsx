import styles from "./AdminPanelSectionTitle.module.scss";

interface AdminPanelSectionTitleProps {
  title: string;
}

export const AdminPanelSectionTitle = ({ title }: AdminPanelSectionTitleProps) => {
  return (
    <div className={styles.sectionTitleContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.line}></div>
    </div>
  );
};
