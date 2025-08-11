import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import classNames from 'classnames';
import styles from './checkbox.module.scss';
import { TickIcon_2 } from '@assets/icons';


interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode; 
}

export const Checkbox = <T extends FieldValues>({
  name,
  control,
  label,
  value,
  error = '',
  disabled = false,
  icon,
}: Props<T>) => {
  return (
    <div
      className={classNames(styles.checkboxField, {
        [styles.disabled]: disabled,
      })}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <label className={styles.checkboxLabel}>
            <input
              {...field}
              type='checkbox'
              value={value}
              disabled={disabled}
              className={classNames(styles.checkboxInput, {
                [styles.error]: error,
              })}
              onChange={(e) => {
                const isChecked = e.target.checked;
                field.onChange(
                  isChecked
                    ? [
                        ...(Array.isArray(field.value) ? field.value : []),
                        value,
                      ] 
                    : Array.isArray(field.value)
                    ? field.value.filter((v) => v !== value)
                    : [] 
                );
              }}
            />
            <span className={styles.checkboxCustom}>
              {field.value.includes(value) && (
                <TickIcon_2 className={styles.tickIcon} />
              )}
            </span>
            {label}
            {icon && <span className={styles.icon}>{icon}</span>}
          </label>
        )}
      />
    </div>
  );
};

