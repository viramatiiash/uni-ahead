import { Banner } from "@/pages/HomePage/components/Banner/Banner";
import { Header } from "@/components/Header/Header";
import classNames from "classnames";
import React, { Suspense } from "react";
import styles from "./home-page.module.scss";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { CTA } from "./components/CTA/CTA";
import { OurTeam } from "./components/OurTeam/OurTeam";
import { Testimonials } from "./components/Testimonials/Testimonials";
import { Contacts } from "./components/Contacts/Contacts";
import { FAQ } from "./components/FAQ/FAQ";
import { Footer } from "@/components/Footer/Footer";
import { ModalUp } from "@/components/ModalUp/ModalUp";
import { Phone } from "@/components/Phone/Phone";
import { PageBurger } from "@/components/PageBurger/PageBurger";
import { burgerNavigation } from "@/utils/burgerNavigation";

const OurServices = React.lazy(() =>
  import("./components/OurServices/OurServices").then((module) => ({
    default: module.OurServices,
  }))
);

export const HomePage: React.FC = () => {
  return (
    <div className={classNames("container", styles.homePage)}>
      <ModalUp />
      <Phone />
      <div className={styles.pageBurger}>
        <PageBurger linksArray={burgerNavigation} />
      </div>
      <Header />
      <Banner />
      <AboutUs />
      <Suspense fallback={<div>Завантаження...</div>}>
        <OurServices />
      </Suspense>
      <CTA />
      <OurTeam />
      <FAQ />
      <Testimonials />
      <Contacts />
      <Footer />
    </div>
  );
};
