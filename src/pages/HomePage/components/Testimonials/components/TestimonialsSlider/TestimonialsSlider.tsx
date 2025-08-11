import styles from "./testimonials-slider.module.scss";
import { TestimonialsCard } from "./../TestimonialsCard/TestimonialsCard";
import { TestimonialType } from '@/pages/AdminPanelPage/components/TestimonialsAP/TestimonialsAP';

import {
  Carousel,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselDots,
  CarouselContent,
  CarouselSlide,
} from "@components/CustomSlider";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from "@/constants/api";


const fetchTestimonials = async (): Promise<TestimonialType[]> => {
  const res = await axios.get(`${API_BASE_URL}/api/testimonials`);
  return res.data;
};

export const TestimonialsSlider = () => {
  const {
    data: testimonials,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  console.log(testimonials);
  

  const emblaOptions = {
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    startIndex: 0,
    loop: true,
    skipSnaps: true,
  };

  return (
    <section className={styles.section}>
      <div className="containerVisible">
        <Carousel className={styles.carousel} options={emblaOptions}>
          <CarouselPrevButton className={styles.buttonPrev} />

          <CarouselNextButton className={styles.buttonNext} />

          <CarouselContent viewportClassName={styles.viewport}>
            {testimonials?.map((slide) => (
              <CarouselSlide
                className={styles.slide}
                key={`review-${slide.id}`}
              >
                <TestimonialsCard cardData={slide} />
              </CarouselSlide>
            ))}
          </CarouselContent>

          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
};
