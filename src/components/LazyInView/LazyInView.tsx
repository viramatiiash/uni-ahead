import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface LazyInViewProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazyInView: React.FC<LazyInViewProps> = ({
  children,
  className,
  threshold = 0.3,
  rootMargin = "0px",
}) => {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (inView) setHasBeenVisible(true);
  }, [inView]);

  return (
    <div ref={ref} className={className}>
      {hasBeenVisible ? children : null}
    </div>
  );
};
