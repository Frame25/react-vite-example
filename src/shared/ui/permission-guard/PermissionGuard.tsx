import {observer} from 'mobx-react-lite';
import {ReactNode, useMemo} from 'react';

import {userModel} from 'entities';

import {Forbidden} from 'pages/forbidden';

import {Permission, Role} from 'entities/user/permissions';

export type PermissionGuardProps = {
  children: ReactNode;
  roles?: Role[];
  permissions?: Permission[];
  fallback?: ReactNode;
};

/**
 * @param roles array of **allowed** roles (one of list);
 * @param permissions array of **required** permissions (each of list);
 * @param fallback ReactComponent will be shown if user has not enough rights
 */
export const PermissionGuard = observer(
  ({children, roles, permissions, fallback = <Forbidden />}: PermissionGuardProps) => {
    const allowed = useMemo(() => {
      let rolesOk = false;
      let permissionsOk = false;

      if (!userModel.data?.role_id || (!roles?.length && !permissions?.length)) {
        return false;
      }

      if (roles instanceof Array) {
        rolesOk = roles.includes(userModel.data.role_id);

        if (!(permissions instanceof Array)) {
          return rolesOk;
        }
      }

      if (permissions instanceof Array) {
        // ok if can't find missing permission in user permissions
        permissionsOk = !permissions.find((permission) => !userModel.permissions[permission]);

        if (!(roles instanceof Array)) {
          return permissionsOk;
        }
      }

      return rolesOk && permissionsOk;
    }, [roles, permissions]);

    return <>{allowed ? children : fallback}</>;
  },
);
