import styles from "./our-team.module.scss";
import { BlockTitle } from "@/components/BlockTitle/BlockTitle";
import { ourTeamVector } from "@/utils/textVectors";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { LazyInView } from "@/components/LazyInView/LazyInView";
import React, { Suspense, useMemo } from "react";
import { API_BASE_URL } from "@/constants/api";

const TeamMembersSlider = React.lazy(() =>
  import("./components/TeamMemberSlider/TeamMembersSlider").then((module) => ({
    default: module.TeamMembersSlider,
  }))
);

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

const fetchTeamMembers = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/team-members`);
  return data;
};

export const OurTeam = () => {
  const { data: members } = useQuery({
    queryKey: ["team-members"],
    queryFn: fetchTeamMembers,
  });

  const sortedMembers = useMemo(() => {
    return members ? [...members].sort((a, b) => a.order - b.order) : [];
  }, [members]);

  return (
    <div id="our-team" className={styles.ourTeam}>
      <div className={styles.blockTitleContainer}>
        <Suspense fallback={null}>
          <TextVector
            viewBox={ourTeamVector.viewBox}
            d={ourTeamVector.d}
            stroke={ourTeamVector.stroke}
            strokeWidth={ourTeamVector.strokeWidth}
            customClass={styles.ourTeamVector}
          />
        </Suspense>
        <BlockTitle text="Наша команда" />
      </div>
      
      {members && (
        <LazyInView>
          <Suspense fallback={<div>Завантаження слайдера...</div>}>
            <TeamMembersSlider members={sortedMembers} />
          </Suspense>
        </LazyInView>
      )}
    </div>
  );
};
