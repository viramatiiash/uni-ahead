import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import classNames from 'classnames';
import styles from './toggle-button.module.scss';

type ToggleButtonProps<T extends string | number | boolean> = {
  value: T;
  onChange: (newValue: T) => void;
  options: T[];
  customClass?: string;
  icons?: Record<T, React.ReactNode>; 
};

export const ToggleButton = <T extends string | number | boolean>({
  value,
  onChange,
  options,
  customClass,
  icons,
}: ToggleButtonProps<T> & { icons?: Record<string, React.ReactNode> }) => {
  const limitedOptions = options.slice(0, 4);
  const activeIndex = limitedOptions.some((option) => option === value)
    ? limitedOptions.indexOf(value)
    : 0;

  const [activeWidth, setActiveWidth] = useState<number>(0);
  const [initialWidth, setInitialWidth] = useState<number>(0);

  const toggleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const setToggleRef = useCallback(
    (index: number) => (toggle: HTMLButtonElement | null) => {
      if (toggle) {
        toggleRefs.current[index] = toggle;
      } else {
        delete toggleRefs.current[index];
      }
    },
    []
  );

  useLayoutEffect(() => {
    const firstToggle = toggleRefs.current[0];
    const activeToggle = toggleRefs.current[activeIndex];

    if (!activeToggle) return;

    const resizeObserver = new ResizeObserver(() => {
      if (firstToggle && activeToggle) {
        setActiveWidth(activeToggle.offsetWidth);
        setInitialWidth(firstToggle.offsetWidth);
      }
    });

    resizeObserver.observe(activeToggle);

    return () => {
      if (activeToggle) resizeObserver.unobserve(activeToggle);
    };
  }, [activeIndex]);

  return (
    <div className={classNames(styles.toggleGroup, customClass)}>
      <div
        className={classNames(styles.toggleGroupSlider, {
          [styles.active]: activeIndex !== 0,
        })}
        style={{
          left: toggleRefs.current[activeIndex]?.offsetLeft || 0,
          width: activeWidth || 'auto',
        }}
      ></div>

      {limitedOptions.map((option, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={String(option)}
            onClick={() => onChange(option)}
            className={classNames(styles.toggleGroupItem, {
              [styles.active]: isActive,
            })}
            disabled={isActive}
            ref={setToggleRef(index)}
          >
            {icons && icons[option as string] && (
              <span className={styles.icon}>{icons[option as string]}</span>
            )}
            <span className={styles.buttonText}>{String(option)}</span>
          </button>
        );
      })}
    </div>
  );
};
