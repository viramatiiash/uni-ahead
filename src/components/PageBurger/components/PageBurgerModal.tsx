import styles from './page-burger-modal.module.scss';
import { InternalLink } from '@/components/InternalLink/InternalLink';
import { ArrowIcon_2, CrossIcon } from '@assets/icons';
import classNames from 'classnames';
import React from 'react';



export const PageBurgerModalComponent = ({
  onClick,
  linksArray,
  activeSection,
  setActiveSection,
}) => {
  const handleClick = (item) => {
    if (item.link) {
    } else if (setActiveSection) {
      setActiveSection(item.title);
      onClick();
    }
  };

  return (
    <div className={styles.pageBurgerModal}>
      <div className={styles.upperPart}>
        <h4 className={styles.title}>Меню</h4>
        <div onClick={onClick} className={styles.closeButton}>
          <CrossIcon className={styles.cross} />
        </div>
      </div>

      <div className={styles.navigationLinks}>
        {linksArray.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className={classNames(styles.linkContainer, {
              [styles.activeLink]:
                activeSection && activeSection === item.title,
            })}
            onClick={() => handleClick(item)}
          >
            {item.link ? (
              <InternalLink
                to={item.link}
                className={classNames(
                  styles.link,
                  item.highlighted && styles.highlighted
                )}
              >
                <span>{item.title}</span>
                <ArrowIcon_2 className={styles.icon} />
              </InternalLink>
            ) : (
              <div
                className={classNames(
                  styles.link,
                  activeSection === item.title && styles.activeLink
                )}
              >
                <span>{item.title}</span>
                <ArrowIcon_2 className={styles.icon} />
              </div>
            )}

            {index < linksArray.length - 1 && (
              <div className={styles.divider} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PageBurgerModal = React.memo(PageBurgerModalComponent);
