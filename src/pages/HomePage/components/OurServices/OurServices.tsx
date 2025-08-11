import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from "./our-services.module.scss";
import classNames from "classnames";
import { BlockTitle } from "@/components/BlockTitle/BlockTitle";
import { ourServicesVector } from "@/utils/textVectors";
import { Wave } from "@/components/Wave/Wave";
import { EuroIcon, WavesIcon_1, WavesIcon_5 } from "@assets/icons";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";
import { Accordion } from "@/components/Accordion/Accordion";
import { LazyInView } from "@/components/LazyInView/LazyInView";
import { API_BASE_URL } from "@/constants/api";
const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

interface AccordionItem {
  _id: string;
  title: string;
  description: string;
  accordionIcon?: any;
}

interface PaymentPlan {
  title: string;
  price: number;
  description: string;
  planIcon?: string;
  accordionItems: AccordionItem[];
}

interface Service {
  title: string;
  courseIcon?: string;
  paymentPlans: PaymentPlan[];
}

const fetchServices = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/services`);
  return data;
};

export const OurServices = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { data: services } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const courseTitles = useMemo(() => {
    return services ? services.map((service) => service.title) : [];
  }, [services]);

  const selectedPlans = useMemo(() => {
    return services && services[selectedIndex]
      ? services[selectedIndex].paymentPlans
      : [];
  }, [services, selectedIndex]);

  useEffect(() => {
    if (selectedPlans.length > 0 && !selectedPlan) {
      const defaultIndex = selectedPlans.length > 1 ? 1 : 0;
      setSelectedPlan(selectedPlans[defaultIndex].title);
    }
  }, [selectedPlans, selectedPlan]);

  const handleCourseChange = (newValue: string) => {
    setSelectedIndex(courseTitles.indexOf(newValue));
    setSelectedPlan(null);
  };

  const handlePlanChange = (newPlan: string) => {
    setSelectedPlan(newPlan);
  };

  const selectedPlanDetails = useMemo(() => {
    return selectedPlans.find((plan) => plan.title === selectedPlan);
  }, [selectedPlans, selectedPlan]);

  const courseIcons = useMemo(() => {
    return services?.reduce((acc, service) => {
      acc[service.title] = service.courseIcon ? (
        <LazyInView>
          <img src={service.courseIcon} alt="course icon" />
        </LazyInView>
      ) : null;
      return acc;
    }, {} as Record<string, React.ReactNode>);
  }, [services]);

  const planIcons = useMemo(() => {
    return selectedPlans.reduce((acc, plan) => {
      acc[plan.title] = plan.planIcon ? (
        <img src={plan.planIcon} alt={`${plan.title} icon`} />
      ) : null;
      return acc;
    }, {} as Record<string, React.ReactNode>);
  }, [selectedPlans]);

  return (
    <div id="services" className={classNames(styles.ourServices, "wrapper")}>
      <Wave containerClass={styles.waveContainer}>
        <WavesIcon_5 className={styles.wave} />
      </Wave>

      <div className={styles.blockTitleContainer}>
        <Suspense fallback={null}>
          <TextVector
            viewBox={ourServicesVector.viewBox}
            d={ourServicesVector.d}
            stroke={ourServicesVector.stroke}
            strokeWidth={ourServicesVector.strokeWidth}
            customClass={styles.ourServicesVector}
          />
        </Suspense>
        <BlockTitle text="Наші послуги" />
      </div>

      <p className={styles.titleDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className={styles.toggleButtonContainer}>
        {courseTitles.length > 0 && (
          <ToggleButton
            value={courseTitles[selectedIndex]}
            onChange={handleCourseChange}
            options={courseTitles}
            icons={courseIcons}
          />
        )}
      </div>

      {selectedPlans.length > 1 && (
        <div className={styles.planContainer}>
          <ToggleButton
            value={selectedPlan || selectedPlans[0].title}
            onChange={handlePlanChange}
            options={selectedPlans.map((plan) => plan.title)}
            customClass={styles.plansToggle}
            icons={planIcons}
          />
        </div>
      )}

      {selectedPlans.length > 0 && (
        <div className={styles.planContent}>
          <h3 className={styles.planTitle}>
            {selectedPlanDetails?.title || selectedPlans[0].title} /{" "}
            <span className={styles.price}>
              {selectedPlanDetails?.price || selectedPlans[0].price}
              <EuroIcon className={styles.euro} />
            </span>
          </h3>
          <p className={styles.planDescription}>
            {selectedPlanDetails?.description || selectedPlans[0].description}
          </p>
          <LazyInView>
            <Accordion
              accordionData={
                selectedPlanDetails?.accordionItems ||
                selectedPlans[0].accordionItems
              }
            />
          </LazyInView>
        </div>
      )}

      <Wave containerClass={styles.waveContainerBottom}>
        <WavesIcon_1 className={styles.waveBottom} />
      </Wave>
    </div>
  );
};
