import {string} from 'yup';

export const emailValidation = string().email('Incorrect email').required('Email is required');
export const passwordValidation = string()
  .min(8, 'Too short password')
  .max(30, 'Too long password')
  .required('Password is required');
export const twoFactorPinValidation = string()
  .min(6, 'Invalid 2FA code')
  .max(6, 'Invalid 2FA code')
  .required('2FA code is required');
