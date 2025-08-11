import { useState } from "react";
import { OurServicesAP } from "./components/OurServicesAP/OurServicesAP";
import { Sidebar } from "./components/Sidebar/Sidebar";
import styles from "./AdmitPanelPage.module.scss";
import classNames from "classnames";
import { HeaderAP } from "./components/HeaderAP/HeaderAP";
import { AboutUsAP } from "./components/AboutUsAP/AboutUsAP";
import { BannerAP } from "./components/BannerAP/BannerAP";
import { OurTeamAP } from "./components/OurTeamAP/OurTeamAP";
import { TestimonialsAP } from "./components/TestimonialsAP/TestimonialsAP";
import { FaqAP } from "./components/FaqAP/FaqAP";
import { Links } from "./components/Links/Links";
import { adminPanelSidebarNavigation } from "@/utils/adminPanelSidebarNavigation";
import { PageBurger } from '@/components/PageBurger/PageBurger';

export const AdminPanelPage = () => {
  const [activeSection, setActiveSection] = useState<string>("Наші послуги");
  return (
    <div className={classNames("container", styles.adminPanelPage)}>
      <HeaderAP />

      <div className={styles.pageBurger}>
        <PageBurger
          linksArray={adminPanelSidebarNavigation}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          alwaysVisible={true}
        />
      </div>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {activeSection === "Баннер" && <BannerAP />}
      {activeSection === "Наші послуги" && <OurServicesAP />}
      {activeSection === "Про нас" && <AboutUsAP />}
      {activeSection === "Наша команда" && <OurTeamAP />}
      {activeSection === "Поширені питання" && <FaqAP />}
      {activeSection === "Відгуки" && <TestimonialsAP />}
      {activeSection === "Контакти" && <Links />}
    </div>
  );
};
