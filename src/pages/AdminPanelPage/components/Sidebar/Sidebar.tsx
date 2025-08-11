import styles from "./Sidebar.module.scss";
import { adminPanelSidebarNavigation } from "@/utils/adminPanelSidebarNavigation";
import { ArrowIcon_2 } from "@assets/icons";
import classNames from "classnames";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.upperPart}>
        <h4 className={styles.title}>Меню</h4>
      </div>
      <div className={styles.navigationLinks}>
        {adminPanelSidebarNavigation.map((item, index) => (
          <div
            onClick={() => setActiveSection(item.title)}
            className={styles.linkContainer}
            key={`navigation-link-${index}`}
          >
            <div
              className={classNames(
                styles.link,
                activeSection === item.title && styles.activeLink
              )}
            >
              <span>{item.title}</span> <ArrowIcon_2 className={styles.icon} />
            </div>
            {index < adminPanelSidebarNavigation.length - 1 ? (
              <div className={styles.divider}></div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
