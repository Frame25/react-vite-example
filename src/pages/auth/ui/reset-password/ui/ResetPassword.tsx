import {useFormik} from 'formik';
import {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {RoutePath} from 'app/router';

import {UPDATE_PASSWORD_VALIDATION_SCHEME} from 'pages/auth/lib/validation';

import {authApi} from 'entities/authApi';

import {ApiError, ErrorCodes} from 'shared/lib/errors';
import {notifications} from 'shared/lib/notification';
import {Button} from 'shared/ui/button';
import {Container} from 'shared/ui/container';
import {InputPassword} from 'shared/ui/input';
import {Text} from 'shared/ui/text';

export const ResetPassword = () => {
  // const [isReadyFor2FA, setIsReadyForTwoFA] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, email] = useMemo(() => {
    const search = new URLSearchParams(location.search);

    return [search.get('token'), search.get('email')];
  }, [location]);
  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: UPDATE_PASSWORD_VALIDATION_SCHEME,
    async onSubmit({password}) {
      if (token && email) {
        const response = await authApi.updatePasswordAfterReset({password, email, token}).catch((e: ApiError) => {
          if (e?.code === ErrorCodes.PASSWORD_CHANGE_EXCEPTION) {
            notifications.error({
              title: 'Token error',
              content:
                'Reset link is incorrect. Can not change password. Click this notification to start process again.',
              onClick() {
                navigate(RoutePath.ForgotPassword);
              },
            });
          }

          return null;
        });

        if (response) {
          navigate(RoutePath.Login);
        }
      }
    },
  });

  useEffect(() => {
    if (!email || !token) {
      notifications.error({
        title: 'Reset link is incorrect',
        content: 'Click this notification to start process again.',
        onClick() {
          navigate(RoutePath.ForgotPassword);
        },
      });
    }
  }, [email, token, navigate]);

  return (
    <Container size="sm">
      <Text className="text-center" size={20} weight={600}>
        Reset password
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <InputPassword
          className="mb-4"
          error={formik.touched.password && formik.errors.password}
          id="password"
          label="New password"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          onPaste={formik.handleBlur}
        />
        <InputPassword
          className="mb-4"
          error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          id="password-confirmation"
          label="Confirm new password"
          name="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          onPaste={formik.handleBlur}
        />
        {/* {isReadyFor2FA && (
          <Input
            error={formik.touched.twoFactorPin && formik.errors.twoFactorPin}
            id="two-factor-pin"
            label="Confirmation code"
            name="twoFactorPin"
            placeholder="Enter 6-digit code"
            type="text"
            value={formik.values.twoFactorPin}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onPaste={formik.handleBlur}
          />
        )} */}
        <Button className="block-full" theme="primary" type="submit">
          Reset
        </Button>
      </form>
    </Container>
  );
};
