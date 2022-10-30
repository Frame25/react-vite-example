import cn from 'classnames';
import {InputHTMLAttributes, ReactNode} from 'react';

import {Icon} from '../icon';

import styles from './Checkbox.module.scss';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  label?: string | ReactNode;
  type?: 'checkbox' | 'radio';
  error?: string | boolean;
  value: boolean;
};
export const Checkbox = ({value, label, type = 'checkbox', error, className, disabled, ...rest}: CheckboxProps) => {
  return (
    <label className={cn(styles.Checkbox, className, disabled && styles.Checkbox_disabled)}>
      {/* @ts-ignore */}
      <input checked={Boolean(value)} className={styles.Checkbox__input} type={type} value={value} {...rest} />
      <span
        className={cn(
          styles.Checkbox__checkbox,
          Boolean(value) && styles.Checkbox__checkbox_checked,
          disabled && styles.Checkbox__checkbox_disabled,
        )}
      >
        <Icon icon="check-base" size="sm" />
      </span>
      {label && <span className={styles.Checkbox__label}>{label}</span>}
      {error && <span className={styles.Checkbox__error}>{error || 'Incorrect value'}</span>}
    </label>
  );
};
