import cn from 'classnames';
import {HTMLProps} from 'react';

import styles from './Container.module.scss';

export type ContainerProps = Omit<HTMLProps<HTMLDivElement>, 'size'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  column?: boolean;
  row?: boolean;
  alignCenter?: boolean;
  alignStart?: boolean;
  alignEnd?: boolean;
  justifyCenter?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  spaceBetween?: boolean;
  spaceAround?: boolean;
  reverse?: boolean;
  white?: boolean;
};

export const Container = ({
  children,
  className,
  row,
  column,
  alignCenter,
  alignStart,
  alignEnd,
  justifyCenter,
  justifyStart,
  justifyEnd,
  spaceBetween,
  spaceAround,
  reverse,
  white,
  size = 'xl',
  ...rest
}: ContainerProps) => {
  const sizeMap = {
    sm: styles.Container_sm,
    md: styles.Container_md,
    lg: styles.Container_lg,
    xl: styles.Container_xl,
    full: null,
  };

  return (
    <div
      className={cn(
        styles.Container,
        sizeMap[size],
        row && styles.Container_row,
        column && styles.Container_column,
        alignCenter && styles.Container_alignCenter,
        alignStart && styles.Container_alignStart,
        alignEnd && styles.Container_alignEnd,
        justifyCenter && styles.Container_justifyCenter,
        justifyStart && styles.Container_justifyStart,
        justifyEnd && styles.Container_justifyEnd,
        spaceBetween && styles.Container_spaceBetween,
        spaceAround && styles.Container_spaceAround,
        reverse && styles.Container_reverse,
        white && styles.Container_white,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
