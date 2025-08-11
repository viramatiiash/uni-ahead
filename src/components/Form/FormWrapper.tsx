import { ReactNode } from 'react';
import styles from './form-wrapper.module.scss';
import classNames from 'classnames';

interface FormWrapperProps {
  className?: string;
  children: ReactNode;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ className, children }) => {
  return <div className={classNames(styles.formWrapper, className)}>{children}</div>;
};

