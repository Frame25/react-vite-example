// Error Codes
export enum ErrorCodes {
  PASSWORD_CHANGE_EXCEPTION = 'password-change-exception',
  ALREADY_PAIRED_2FA = 'already-paired-2fa',
  USER_NOT_INVITED = 'user-not-invited',
}

export type ApiErrorData = {
  code: ErrorCodes;
  message: string;
  payload: any | null;
  status: number;
};
export class ApiError extends Error {
  code: string;
  payload: any | null;
  status: number;

  constructor(data: ApiErrorData) {
    super();
    this.name = data.code;
    this.code = data.code;
    this.status = data.status;
    this.payload = data.payload;
    this.message = data.message || 'Unknown error';
  }
}
