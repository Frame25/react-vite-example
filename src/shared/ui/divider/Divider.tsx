import cn from 'classnames';

import styles from './Divider.module.scss';

export const Divider = ({className, ...rest}: any) => {
  return <div className={cn(styles.Divider, className)} />;
};
