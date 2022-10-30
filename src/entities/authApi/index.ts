import {UserData} from 'entities/user/user.types';

import {ApiErrorData} from 'shared/lib/errors';
import {fetcher} from 'shared/lib/fetcher';

type Web2Params = {email: string; password: string};
type TwoFactorParam = {'two-factor-pin': string};

export type RegisterRequestParams = Web2Params & {name: string};

export type PartialLoginRequestParams = Web2Params;

export type LoginRequestParams = TwoFactorParam & Web2Params;

export type ResetPasswordRequestParam = {email: string};

export type UpdatePasswordRequestParams = Web2Params & {token: string};

export type ChangePasswordRequestParams = {
  oldPassword: string;
  newPassword: string;
};

export type UserResponseData = {
  result: {
    user: UserData;
    token: string;
  };
  error: ApiErrorData | null;
};

export type PairTwoFactorResponse = {
  result: {
    qrLink: string;
  };
  error: ApiErrorData | null;
};

export type OkResponse = {
  result: [];
  error: ApiErrorData | null;
};

export class AuthApi {
  /** creates new user record, sets token and returns user if user is invited or fails */
  register(params: RegisterRequestParams) {
    return fetcher.post('user/register', {json: params}).json<UserResponseData>();
  }

  /** requests a QR code for setup Google Authenticator */
  pairTwoFactor() {
    return fetcher.post('user/pairTwoFactor', {json: []}).json<PairTwoFactorResponse>();
  }

  login(params: LoginRequestParams) {
    return fetcher.post('user/login', {json: params}).json<UserResponseData>();
  }

  partialLogin(params: PartialLoginRequestParams) {
    return fetcher.post('user/partialLogin', {json: params}).json<UserResponseData>();
  }

  loginOnlyTwoFactor(params: TwoFactorParam) {
    return fetcher.post('user/loginOnlyTwoFactor', {json: params}).json<UserResponseData>();
  }

  requestResetPassword(params: ResetPasswordRequestParam) {
    return fetcher.post('user/password-send-reset-link', {json: params}).json<OkResponse>();
  }

  updatePasswordAfterReset(params: UpdatePasswordRequestParams) {
    return fetcher.post('user/password-update-after-reset', {json: params}).json<OkResponse>();
  }

  changePassword(params: ChangePasswordRequestParams) {
    return fetcher.post('user/password/change', {json: params}).json<OkResponse>();
  }
}

export const authApi = new AuthApi();
