import cn from 'classnames';
import {HTMLAttributes} from 'react';

export type TextProps = HTMLAttributes<HTMLElement> & {
  tag?: 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3';
  size?: 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 28 | 32 | 36;
  color?:
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'blueLight'
    | 'blueLighten'
    | 'white'
    | 'secondary'
    | 'secondary2'
    | 'disabled'
    | 'black';
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
};

export function Text({children, className, size, color, weight, tag: Tag = 'p', ...rest}: TextProps) {
  return (
    <Tag
      className={cn(
        size && `font-size-${size}`,
        color && `text-${color}`,
        weight && `font-weight-${weight}`,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
