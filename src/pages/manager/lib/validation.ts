import {object} from 'yup';

import {emailValidation} from 'shared/lib/validation';

export const INVITE_VALIDATION_SCHEMA = object().shape({
  email: emailValidation,
});
