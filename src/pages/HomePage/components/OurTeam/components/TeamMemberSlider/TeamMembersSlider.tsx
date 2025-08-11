import styles from "./team-members-slider.module.scss";
import { ourTeamMembersData } from "@/utils/ourTeamMembersData";
import { TeamMemberCard } from "../TeamMemberCard/TeamMemberCard";
import useEmblaCarousel from "embla-carousel-react";

import {
  Carousel,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselDots,
  CarouselContent,
  CarouselSlide,
} from "@components/CustomSlider";
import { TeamMemberType } from "@/pages/AdminPanelPage/components/OurTeamAP/OurTeamAP";
import { useMemo } from 'react';

interface TeamMembersSliderProps {
  members: TeamMemberType[];
}

export const TeamMembersSlider: React.FC<TeamMembersSliderProps> = ({
  members,
}) => {
  const emblaOptions = useMemo(
    () => ({
      align: "start",
      dragFree: false,
      slidesToScroll: 1,
      startIndex: 0,
      loop: true,
      skipSnaps: true,
    }),
    []
  );

  const [emblaRef] = useEmblaCarousel(emblaOptions);

  return (
    <section className={styles.section}>
      <div className="containerVisible">
        <Carousel className={styles.carousel} options={emblaOptions}>
          {members.length > 4 && <CarouselPrevButton />}

          {members.length > 4 && <CarouselNextButton />}

          <CarouselContent ref={emblaRef} viewportClassName={styles.viewport}>
            {members.map((member, index) => (
              <CarouselSlide
                className={`${styles.slide} ${
                  members.length === 4 && index === 0 ? styles.noLeftMargin : ""
                }`}
                key={member._id}
              >
                <TeamMemberCard
                  bgImg={member.photo}
                  name={member.name}
                  position={member.position}
                  description={member.description}
                />
              </CarouselSlide>
            ))}
          </CarouselContent>

          {members.length > 4 && <CarouselDots />}
        </Carousel>
      </div>
    </section>
  );
};
