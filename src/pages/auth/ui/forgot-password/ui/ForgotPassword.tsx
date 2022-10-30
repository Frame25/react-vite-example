import cn from 'classnames';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';

import {FORGOT_PASSWORD_SCHEME} from 'pages/auth/lib/validation';

import {authApi} from 'entities/authApi';

import {useSessionStorage} from 'shared/lib/storage.helpers';
import {Button} from 'shared/ui/button';
import {Container} from 'shared/ui/container';
import {Icon} from 'shared/ui/icon';
import {Input} from 'shared/ui/input';
import {Text} from 'shared/ui/text';

import styles from './ForgotPassword.module.scss';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useSessionStorage('reset-link-is-sent', false);
  const formik = useFormik({
    initialValues: {email: ''},
    validationSchema: FORGOT_PASSWORD_SCHEME,
    async onSubmit({email}) {
      const response = await authApi.requestResetPassword({email});

      if (!response.error) {
        setIsSent(true);
      }
    },
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className={styles.ForgotPassword} size="sm">
      {isSent ? (
        <Text className={cn(styles.ForgotPassword__title, 'text-center mb-4 mt-0')} size={20} weight={600}>
          Please check your e-mail
        </Text>
      ) : (
        <>
          <Text className={cn(styles.ForgotPassword__title, 'text-center mb-4 mt-0')} size={20} weight={600}>
            <Icon className={styles.ForgotPassword__backButton} icon="arrow" onClick={handleGoBack} />
            Reset password
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <Input
              className="mb-4"
              error={formik.touched.email && formik.errors.email}
              id="email"
              label="Email"
              placeholder="youremail@nearpay.co"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onPaste={formik.handleBlur}
            />

            {/* <Input
              className="mb-4"
              error={formik.touched.twoFactorPin && formik.errors.twoFactorPin}
              id="two-factor-pin"
              label="Two-factor code"
              name="twoFactorPin"
              placeholder="Enter 6-digit code"
              type="text"
              value={formik.values.twoFactorPin}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              onPaste={formik.handleBlur}
              onPasteButtonClick={(text) => formik.setFieldValue('twoFactorPin', text)}
            /> */}

            <Button className="block-full" theme="primary" type="submit">
              Send recover link
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};
