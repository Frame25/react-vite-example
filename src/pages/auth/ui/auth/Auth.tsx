import {Outlet} from 'react-router-dom';

import {Container} from 'shared/ui/container';
import {Icon} from 'shared/ui/icon';

import styles from './Auth.module.scss';

export const Auth = () => {
  return (
    <Container className={styles.Auth} size="md">
      <Icon className={styles.Auth__logo} icon="logo" style={{width: 84, height: 38}} />
      <Outlet />
    </Container>
  );
};
