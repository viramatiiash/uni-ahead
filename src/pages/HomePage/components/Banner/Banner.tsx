import React, { useEffect, useMemo, useState } from "react";
import styles from "./banner.module.scss";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { WavesIcon_2 } from "@assets/icons";
import { Wave } from "@/components/Wave/Wave";
import { InternalLink } from "@/components/InternalLink/InternalLink";
import { API_BASE_URL } from "@/constants/api";

const fetchBanner = async () => {
  const res = await fetch(`${API_BASE_URL}/api/banner`);
  if (!res.ok) throw new Error("Failed to fetch Banner data");
  return res.json();
};

interface BannerPhoto {
  url: string;
  order: number;
}

interface BannerData {
  title: string;
  text: string;
  photos: BannerPhoto[];
}

const TextEditorRenderer = React.lazy(() =>
  import("@/components/TextEditor/TextEditorRenderer/TextEditorRenderer").then(
    (module) => ({
      default: module.TextEditorRenderer,
    })
  )
);

export const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const { data, isLoading } = useQuery<BannerData>({
    queryKey: ["banner"],
    queryFn: fetchBanner,
  });

  const images = useMemo(() => {
    return data?.photos?.slice().sort((a, b) => a.order - b.order) || [];
  }, [data]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 10000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    if (!images.length) return;

    images.forEach((img, index) => {
      if (index !== 0) {
        const preload = new Image();
        preload.loading = "lazy";
        preload.src = img.url;
      }
    });

    const interval = setInterval(() => {
      setPrev((prev) => current);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  const renderedText = useMemo(
    () => (
      <TextEditorRenderer
        value={data?.text ?? ""}
        className={styles.subtitle}
      />
    ),
    [data?.text]
  );
  if (isLoading || !data) return null;

  return (
    <div className={styles.banner}>
      <Wave containerClass={styles.waveContainer}>
        <WavesIcon_2 className={styles.wave} />
      </Wave>

      <div className={classNames(styles.polygonContainer, "wrapper")}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data.title}</h1>

          {renderedText}

          <InternalLink to="#contacts" className={styles.link}>
            <span className={styles.span}>Зв'язатися</span>
          </InternalLink>
        </div>
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((img, index) => (
            <div className={styles.embla__slide} key={index}>
              <img
                src={img.url}
                alt={`Banner image #${index + 1}`}
                className={styles.bannerBG}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
