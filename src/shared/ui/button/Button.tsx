import cn from 'classnames';
import {ButtonHTMLAttributes, ReactNode} from 'react';

import styles from './Button.module.scss';

export type ButtonTheme = 'primary' | 'white' | 'secondary';

export type ButtonProps = ButtonHTMLAttributes<any> & {
  children?: string | ReactNode;
  theme?: ButtonTheme;
  disabled?: boolean;
  outlined?: boolean;
  sm?: boolean;
};

const themeMap = {
  primary: styles.Button_primary,
  white: styles.Button_white,
  secondary: styles.Button_secondary,
};

export const Button = ({children, className, theme, disabled, outlined, sm, ...rest}: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.Button,
        theme && themeMap[theme],
        outlined && styles.Button_outlined,
        disabled && styles.Button_disabled,
        sm && styles.Button_sm,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
