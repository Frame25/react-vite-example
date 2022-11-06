import {boolean, object, string, ref} from 'yup';

import {emailValidation, passwordValidation, twoFactorPinValidation} from 'shared/lib/validation';

export const PARTIAL_LOGIN_VALIDATION_SCHEME = object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const LOGIN_VALIDATION_SCHEME = object().shape({
  email: emailValidation,
  password: passwordValidation,
  twoFactorPin: twoFactorPinValidation,
});

export const FORGOT_PASSWORD_SCHEME = object().shape({
  email: emailValidation,
  twoFactorPin: twoFactorPinValidation,
});

export const SIGNUP_VALIDATION_SCHEME = object().shape({
  name: string().required('Enter your name, please'),
  email: emailValidation,
  password: passwordValidation,
  agreement: boolean()
    .isTrue('You should accept the Terms of Service')
    .required('You should accept the Terms of Service'),
});

export const UPDATE_PASSWORD_VALIDATION_SCHEME = object().shape({
  password: passwordValidation,
  passwordConfirmation: passwordValidation.oneOf([ref('password')], 'Passwords must match'),
  // twoFactorPin: twoFactorPinValidation,
});

export const CHANGE_PASSWORD_VALIDATION_SCHEME = object().shape({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
});
