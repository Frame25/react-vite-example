import {makeAutoObservable, reaction} from 'mobx';

import {CACHED_USER_KEY, USER_AUTH_TOKEN} from 'shared/constants';

import {getUserPermissions, PermissionsMap} from './permissions';
import {UserData} from './user.types';

export class UserModel {
  data: UserData | null = null;
  token: string | null = null;
  permissions: PermissionsMap = {};

  constructor() {
    const cachedUserData = window.localStorage.getItem(CACHED_USER_KEY);
    const cachedUserToken = window.localStorage.getItem(USER_AUTH_TOKEN);

    if (cachedUserData) {
      try {
        this.data = JSON.parse(cachedUserData);
        this.permissions = getUserPermissions(this.data?.role_id);
      } catch (e) {}
    }
    if (cachedUserToken) {
      this.token = cachedUserToken;
    }

    makeAutoObservable(this);
  }

  login(data: UserData, token: string) {
    this.setUser(data);
    this.setToken(token);
  }

  logout() {
    this.removeUser();
    this.removeToken();
  }

  setUser(data: UserData) {
    this.data = data;
    window.localStorage.setItem(CACHED_USER_KEY, JSON.stringify(data));
  }
  removeUser() {
    this.data = null;
    window.localStorage.removeItem(CACHED_USER_KEY);
  }

  setToken(token: string) {
    this.token = token;
    window.localStorage.setItem(USER_AUTH_TOKEN, token);
  }
  removeToken() {
    this.token = null;
    window.localStorage.removeItem(USER_AUTH_TOKEN);
  }
}

export const userModel = new UserModel();

reaction(
  () => userModel.data?.role_id,
  (role) => {
    if (role) {
      userModel.permissions = getUserPermissions(role);
    }
  },
);
