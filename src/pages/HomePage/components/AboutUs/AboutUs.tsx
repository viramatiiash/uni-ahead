import React, { Suspense, useMemo } from "react";
import styles from "./about-us.module.scss";
import classNames from "classnames";
import { BlockTitle } from "@/components/BlockTitle/BlockTitle";
import { CloudBG, YoutubeIcon } from "@assets/icons";
import {
  aboutUsArrowVector,
  aboutUsArrowVector_2,
  aboutUsPlayVector,
  aboutUsVector,
} from "@/utils/textVectors";
import { aboutUsInfos } from "@/utils/aboutUsInfos";
import { Video } from "@/components/Video/Video";
import { useQuery } from "@tanstack/react-query";
import { LazyInView } from "@/components/LazyInView/LazyInView";
import { API_BASE_URL } from "@/constants/api";

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

const fetchAboutUs = async () => {
  const res = await fetch(`${API_BASE_URL}/api/about-us`);
  if (!res.ok) throw new Error("Failed to fetch About Us data");
  return res.json();
};

const TextEditorRenderer = React.lazy(() =>
  import("@/components/TextEditor/TextEditorRenderer/TextEditorRenderer").then(
    (module) => ({
      default: module.TextEditorRenderer,
    })
  )
);

export const AboutUs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["about_us"],
    queryFn: fetchAboutUs,
  });

  const renderedText = useMemo(
    () => <TextEditorRenderer value={data?.text} className={styles.text} />,
    [data?.text]
  );

  const renderedVideo = useMemo(
    () => <Video src={data?.videoUrl} />,
    [data?.videoUrl]
  );

  if (isLoading || !data) return null;

  return (
    <div id="about-us" className={classNames(styles.aboutUs, "wrapper")}>
      <div className={styles.blockTitleContainer}>
        <Suspense fallback={null}>
          <TextVector
            viewBox={aboutUsVector.viewBox}
            d={aboutUsVector.d}
            stroke={aboutUsVector.stroke}
            strokeWidth={aboutUsVector.strokeWidth}
          />
        </Suspense>
        <BlockTitle text={aboutUsInfos.title} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h4 className={styles.textTitle}>{data.miniTitle}</h4>

          {renderedText}

          <div className={styles.ctaContainer}>
            <YoutubeIcon className={styles.icon} />

            <p className={styles.ctaText}>
              Натискай{" "}
              <span className={styles.ctaVectorContainer}>
                <Suspense fallback={null}>
                  <TextVector
                    customClass={styles.arrowVector}
                    viewBox={aboutUsArrowVector.viewBox}
                    d={aboutUsArrowVector.d}
                    stroke={aboutUsArrowVector.stroke}
                    strokeWidth={aboutUsArrowVector.strokeWidth}
                  />
                </Suspense>

                <Suspense fallback={null}>
                  <TextVector
                    customClass={styles.arrowVector_2}
                    viewBox={aboutUsArrowVector_2.viewBox}
                    d={aboutUsArrowVector_2.d}
                    stroke={aboutUsArrowVector_2.stroke}
                    strokeWidth={aboutUsArrowVector_2.strokeWidth}
                  />
                </Suspense>
                
                <Suspense fallback={null}>
                  <TextVector
                    viewBox={aboutUsPlayVector.viewBox}
                    d={aboutUsPlayVector.d}
                    stroke={aboutUsPlayVector.stroke}
                    strokeWidth={aboutUsPlayVector.strokeWidth}
                  />
                </Suspense>
                play
              </span>{" "}
              і насолоджуйся!
            </p>
          </div>
        </div>

        <div className={styles.videoContainer}>
          <CloudBG className={styles.cloudBG} />
          <LazyInView>{renderedVideo}</LazyInView>
        </div>
      </div>
    </div>
  );
};
