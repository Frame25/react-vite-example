import cn from 'classnames';
import {useFormik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Transition} from 'react-transition-group';

import {LOGIN_VALIDATION_SCHEME, PARTIAL_LOGIN_VALIDATION_SCHEME} from 'pages/auth/lib/validation';

import {authApi} from 'entities/authApi';
import {userModel} from 'entities/user';

import {ApiError, ErrorCodes} from 'shared/lib/errors';
import {useMemorizedRoute} from 'shared/lib/router.helpers';
import {Button} from 'shared/ui/button/Button';
import {Container} from 'shared/ui/container/Container';
import {Input, InputPassword} from 'shared/ui/input';

import styles from './Login.module.scss';

export const Login = observer(() => {
  const navigate = useNavigate();
  const {getMemoRoute} = useMemorizedRoute();
  const [isReadyForTwoFA, setIsReadyForTwoFA] = useState(false);
  const formik = useFormik({
    initialValues: isReadyForTwoFA
      ? {
          email: '',
          password: '',
          twoFactorPin: '',
        }
      : {
          email: '',
          password: '',
        },
    validationSchema: isReadyForTwoFA ? LOGIN_VALIDATION_SCHEME : PARTIAL_LOGIN_VALIDATION_SCHEME,
    async onSubmit({email, password, twoFactorPin}) {
      if (isReadyForTwoFA && twoFactorPin) {
        const response = await authApi.login({email, password, 'two-factor-pin': twoFactorPin});

        if (response?.result?.token) {
          navigate(getMemoRoute());
        }
      } else {
        const response = await authApi.partialLogin({email, password}).catch((err: ApiError) => {
          if (err?.code === ErrorCodes.ALREADY_PAIRED_2FA) {
            setIsReadyForTwoFA(true);
          }

          return null;
        });

        if (response?.result?.user && !response.result.user.two_factor_paired) {
          userModel.login(response.result.user, response.result.token);
          navigate('/auth/setup-2fa');
        }
      }
    },
  });

  const transitionRef = useRef(null);

  useEffect(() => {
    if (userModel.token) {
      navigate(getMemoRoute());
    }
  }, [getMemoRoute, navigate]);

  return (
    <Container alignCenter column className={styles.LoginPage}>
      <h2>Log in</h2>
      <Container size="sm">
        <form onSubmit={formik.handleSubmit}>
          <Input
            className="mb-4"
            error={formik.touched.email && formik.errors.email}
            id="email"
            label={'Email'}
            name="email"
            placeholder={'youremail@gmail.com'}
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onPaste={formik.handleBlur}
          />

          <InputPassword
            error={formik.touched.password && formik.errors.password}
            id="password"
            label={'Password'}
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onPaste={formik.handleBlur}
          />

          <Transition mountOnEnter unmountOnExit in={isReadyForTwoFA} nodeRef={transitionRef} timeout={300}>
            {(status) => (
              <Input
                className={`element-fade-${status} mt-4`}
                error={formik.touched.twoFactorPin && formik.errors.twoFactorPin}
                id="twoFactorPin"
                label="Confirmation code"
                name="twoFactorPin"
                ref={transitionRef}
                value={formik.values.twoFactorPin}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                onPaste={formik.handleBlur}
                onPasteButtonClick={(text) => formik.setFieldValue('twoFactorPin', text)}
              />
            )}
          </Transition>

          <Link className={cn(styles.LoginPage__link, 'mt-5')} to={'/auth/forgot-password'}>
            Forgot password?
          </Link>

          <Button className="block-full mt-5" theme="primary" type="submit">
            Log in
          </Button>
        </form>
      </Container>
    </Container>
  );
});
