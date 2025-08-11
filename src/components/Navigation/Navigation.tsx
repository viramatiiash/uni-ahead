import { HashLink } from 'react-router-hash-link';
import { NavigationProps } from '@interfaces/navigation.types';
import classNames from 'classnames';
import styles from './navigation.module.scss';
import { navigationVector } from '@/utils/textVectors';
import React, { Suspense, useState } from 'react';

const TextVector = React.lazy(() =>
  import("@/components/TextVector/TextVector").then((mod) => ({
    default: mod.TextVector,
  }))
);

export const Navigation: React.FC<NavigationProps> = ({
  linksArray,
  navStyles,
  linkStyles,
  onClick,
}) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <nav className={navStyles}>
      {linksArray.map((link) => (
        <HashLink
          key={link.link}
          className={classNames(styles.navLink, linkStyles)}
          smooth
          to={link.link}
          onMouseEnter={() => setHoveredLink(link.link)}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={onClick}
        >
          <span className={styles.span}>
            {link.title}{" "}
            {hoveredLink === link.link && (
              <Suspense fallback={null}>
                <TextVector
                  viewBox={navigationVector.viewBox}
                  d={navigationVector.d}
                  stroke={navigationVector.stroke}
                  strokeWidth={navigationVector.strokeWidth}
                  customClass={styles.navigationVector}
                  transitionDuration="0.3"
                />
              </Suspense>
            )}
          </span>
        </HashLink>
      ))}
    </nav>
  );
};
