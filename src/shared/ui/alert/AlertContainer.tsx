import cn from 'classnames';
import {observer} from 'mobx-react-lite';
import {useMemo} from 'react';

import {NotificationListItem} from 'shared/lib/notification';
import {Container} from 'shared/ui/container';

import {Alert} from './Alert';
import styles from './AlertContainer.module.scss';

export type AlertContainerProps = {
  list: NotificationListItem[];
  align?: 'left' | 'right' | 'center';
  position?: 'top' | 'bottom';
};

export const AlertContainer = observer(({list, align, position}: AlertContainerProps) => {
  const alignProp = useMemo(() => {
    if (align === 'center') {
      return {alignCenter: true};
    }
    if (align === 'right') {
      return {alignEnd: true};
    }

    return {};
  }, [align]);

  return (
    <Container
      column
      {...alignProp}
      className={cn(styles.AlertContainer, position === 'bottom' && styles.AlertContainer_bottom)}
    >
      <div className={styles.AlertContainer__alertsList}>
        {list.map(({id, ...alertProps}) => (
          <Alert {...alertProps} animated className="mb-4" key={id} />
        ))}
      </div>
    </Container>
  );
});
