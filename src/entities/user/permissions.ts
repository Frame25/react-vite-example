export enum Role {
  ADMIN = 1,
  USER = 2,
}

export enum Permission {
  LOGOUT = 'LOGOUT',
  CAN_BLOCK_USER = 'CAN_BLOCK_USER',
  CAN_UNBLOCK_USER = 'CAN_UNBLOCK_USER',
  CAN_INVITE_USER = 'CAN_INVITE_USER',
  CAN_CHANGE_PASSWORD_OF_HIS_ACCOUNT = 'CAN_CHANGE_PASSWORD_OF_HIS_ACCOUNT',
  CAN_READ_SETTINGS = 'CAN_READ_SETTINGS',
}

export const PermissionsToRoles = {
  [Role.ADMIN]: [
    Permission.LOGOUT,
    Permission.CAN_CHANGE_PASSWORD_OF_HIS_ACCOUNT,
    Permission.CAN_READ_SETTINGS,
    Permission.CAN_BLOCK_USER,
    Permission.CAN_UNBLOCK_USER,
    Permission.CAN_INVITE_USER,
  ],
  [Role.USER]: [Permission.LOGOUT, Permission.CAN_CHANGE_PASSWORD_OF_HIS_ACCOUNT, Permission.CAN_READ_SETTINGS],
};

export type PermissionsMap = {
  [key in Permission]?: boolean;
};

export const can = (role: Role, permission: Permission) => {
  return role && permission ? PermissionsToRoles[role].includes(permission) : false;
};

export const getUserPermissions = (role?: Role) =>
  role
    ? Object.keys(Permission).reduce((acc, permission) => {
        acc[permission as Permission] = can(role, permission as Permission);

        return acc;
      }, {} as PermissionsMap)
    : ({} as PermissionsMap);
