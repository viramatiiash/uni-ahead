import React from 'react';
import styles from './link-with-icon.module.scss';
import { ExternalLink } from '../ExpernalLink/ExternalLink';
import { InternalLink } from '../InternalLink/InternalLink';

interface LinkWithIconProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  link: string;
  linkText: string;
  isInternal: boolean;
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({
  Icon,
  link,
  linkText,
  isInternal,
}) => {
  return (
    <>
      {!isInternal ? (
        <ExternalLink className={styles.linkContainer} href={link}>
          <div className={styles.iconContainer}>
            <Icon />
          </div>

          <span className={styles.linkText}>{linkText}</span>
        </ExternalLink>
      ) : (
        <InternalLink className={styles.linkContainer} to={link}>
          <div className={styles.iconContainer}>
            <Icon />
            </div>
            
          <span className={styles.linkText}>{linkText}</span>
        </InternalLink>
      )}
    </>
  );
};
