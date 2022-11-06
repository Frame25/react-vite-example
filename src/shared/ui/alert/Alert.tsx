import cn from 'classnames';
import {ReactNode} from 'react';

import {Icon} from '../icon';

import styles from './Alert.module.scss';

export type AlertProps = {
  title?: ReactNode;
  type?: 'info' | 'success' | 'danger' | 'warning';
  content?: ReactNode;
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
  animated?: boolean;
};

const TYPES_MAP = {
  info: styles.Alert_info,
  success: styles.Alert_success,
  danger: styles.Alert_danger,
  warning: styles.Alert_warning,
};

export const Alert = ({title, type, content, onClose, className, animated, ...rest}: AlertProps) => {
  return (
    <div className={cn(styles.Alert, type && TYPES_MAP[type], animated && styles.Alert_animated, className)} {...rest}>
      {title && <div className={styles.Alert__title}>{title}</div>}
      {content && <div className={styles.Alert__content}>{content}</div>}
      {typeof onClose === 'function' && <Icon className={styles.Alert__close} icon="x" onClick={onClose} />}
    </div>
  );
};
