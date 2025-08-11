import React from 'react';
import styles from './button.module.scss';
import classNames from 'classnames';

type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: string;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary'
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(styles.button, styles[`button--${variant}`], className)}
      disabled={disabled}
    >
      <span className={styles.span}>{children}</span>
    </button>
  );
};
