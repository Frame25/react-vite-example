import cn from 'classnames';
import {useFormik} from 'formik';
import {observer} from 'mobx-react-lite';
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {SIGNUP_VALIDATION_SCHEME} from 'pages/auth/lib/validation';

import {authApi} from 'entities/authApi';
import {userModel} from 'entities/user';

import {Button} from 'shared/ui/button/Button';
import {Checkbox} from 'shared/ui/checkbox';
import {Container} from 'shared/ui/container/Container';
import {Input, InputPassword} from 'shared/ui/input';

import styles from './SignUp.module.scss';

export const SignUp = observer(() => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: urlSearchParams.get('email') || '',
      password: '',
      agreement: false,
    },
    validationSchema: SIGNUP_VALIDATION_SCHEME,
    async onSubmit({name, email, password}) {
      const response = await authApi.register({name, email, password});

      if (response?.result?.token) {
        userModel.login(response.result.user, response.result.token);
      }

      navigate('/auth/setup-2fa');
    },
  });

  useEffect(() => {
    if (userModel.token) {
      navigate('/', {replace: true});
    }
  }, [navigate]);

  return (
    <Container alignCenter column className={styles.SignUpPage}>
      <h2>Sign up</h2>

      <Container size="sm">
        <form onSubmit={formik.handleSubmit}>
          <Input
            className="mb-4"
            error={formik.touched.name && formik.errors.name}
            id="name"
            label={'Name'}
            name="name"
            placeholder={'Your Name'}
            type="text"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            onPaste={formik.handleBlur}
          />

          <Input
            className="mb-4"
            error={formik.touched.email && formik.errors.email}
            id="email"
            label={'Email'}
            name="email"
            placeholder={'youremail@nearpay.co'}
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

          <Checkbox
            className="mt-4"
            error={formik.touched.agreement && formik.errors.agreement}
            id="agreement"
            label={
              <p className="font-size-14 text-secondary">
                I agree to the <a href="pages/auth/ui/sign-up/ui/SignUp#">Terms of Service</a>, and acknowledge the{' '}
                <a href="pages/auth/ui/sign-up/ui/SignUp#">Privacy Policy</a>.
              </p>
            }
            name="agreement"
            value={formik.values.agreement}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <Button className="block-full mt-4" theme="primary" type="submit">
            Create account
          </Button>
        </form>

        <Link className={cn(styles.SignUpPage__link, 'mt-5')} to={'/login'}>
          Already have account
        </Link>
      </Container>
    </Container>
  );
});
