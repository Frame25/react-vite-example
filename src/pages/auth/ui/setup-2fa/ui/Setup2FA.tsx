import cn from 'classnames';
import {useFormik} from 'formik';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {userModel} from 'entities';

import {RoutePath} from 'app/router';

import {authApi} from 'entities/authApi';

import {USER_TEMP_LOGIN_DATA} from 'shared/constants';
import {notifications} from 'shared/lib/notification';
import {getEncodedDataFromStorage} from 'shared/lib/storage.helpers';
import {Button} from 'shared/ui/button';
import {Container} from 'shared/ui/container/Container';
import {Divider} from 'shared/ui/divider';
import {Icon} from 'shared/ui/icon';
import {Input} from 'shared/ui/input';
import {Text} from 'shared/ui/text';

import styles from './Setup2FA.module.scss';

export const Setup2FA = () => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const [qrLink, setQrLink] = useState('');
  const formik = useFormik({
    initialValues: {twoFactorPin: ''},
    validate({twoFactorPin}) {
      if (!twoFactorPin || String(twoFactorPin).length !== 6) {
        return {twoFactorPin: 'Invalid 2FA code'};
      }
    },
    async onSubmit({twoFactorPin}) {
      // const response = await authApi.loginOnlyTwoFactor({'two-factor-pin': twoFactorPin});
      const savedLoginData = getEncodedDataFromStorage(USER_TEMP_LOGIN_DATA, window.sessionStorage);

      if (!savedLoginData) {
        notifications.error({
          title: 'Error with 2FA',
          content: "We've got error with your data. Please, click this alert to start again from login page.",
          closable: true,
          onClick() {
            navigate(RoutePath.Login);
          },
        });

        return false;
      }

      const {email, password} = savedLoginData;
      const response = await authApi.login({email, password, 'two-factor-pin': twoFactorPin});

      if (response?.result?.token) {
        await userModel.login(response.result.user, response.result.token);
        notifications.success({
          title: 'Everithing great!',
          content: 'Authenticator is connected, You are logined in.',
          closable: true,
        });
        navigate(RoutePath.Root);
        // TODO: setIsConnected(true);
      }
    },
  });

  const handleRequestQrCode = async () => {
    const response = await authApi.pairTwoFactor();

    if (response?.result?.qrLink) {
      setQrLink(response.result.qrLink);
    }
  };
  const handleRequestRecoveryCodes = () => {
    // TODO: request recovery
  };

  return (
    <Container className={styles.Setup2FA}>
      <Text className="mt-7" size={20} weight={500}>
        Set up 2-step verification
      </Text>
      <Divider className="mt-5 mb-5" />
      {!isConnected && (
        <>
          <Text className="mb-5" color="secondary" size={16}>
            We are extremely concerned about the security of our customers' assets, so please set up 2-step
            verification. <br />
            Here's how to set it up:
          </Text>

          <div className={styles.Setup2FA__instructions}>
            <div className={styles.Setup2FA__instructionsColumn}>
              <ol className="pl-4 m-0">
                <li>
                  <Text className="mt-0 mb-4">Install Google Authenticator on your phone</Text>
                  <Container alignCenter row className={styles.Setup2FA__googleAuthenticatorBlock}>
                    <Icon className="mr-2" color="danger" icon="google-authenticator" size="xxl" />
                    <div>
                      <Text tag="div" weight={600}>
                        Google Authenticator
                      </Text>
                      <Container alignCenter row className="p-0">
                        <Text className="mr-2" color="secondary" tag="div">
                          Available on{' '}
                        </Text>
                        <a
                          className="mr-1"
                          href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Icon icon="appstore" />
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Icon icon="google-play" />
                        </a>
                      </Container>
                    </div>
                  </Container>
                </li>

                <li>
                  <Text className="mt-0 mb-4">Open Google Authenticator app. Tap "+" and hit "Scan QR Code".</Text>
                  <Container justifyCenter row className={styles.Setup2FA__roundIconsBlock}>
                    <Icon className={cn(styles.Setup2FA__icon_round, 'mr-4')} icon="plus" />
                    <Icon className="mr-4" color="greyLight" icon="arrow" />
                    <Icon className={styles.Setup2FA__icon_round} icon="photo-camera" />
                  </Container>
                </li>
              </ol>
            </div>

            <div className={styles.Setup2FA__instructionsColumn}>
              <ol className="pl-4 m-0" start={3}>
                <li>
                  <Text className="mt-0 mb-4">Scan QR code while in the Google Authenticator app</Text>
                  <Container alignCenter row white>
                    <div
                      className={styles.Setup2FA__qrCode}
                      style={qrLink ? {backgroundImage: `url(${qrLink})`, filter: 'none'} : {}}
                    />
                    <div className="ml-4">
                      <Text size={12} tag="div" weight={600}>
                        Scan QR with Google Authenticator
                      </Text>
                      {!qrLink && (
                        <Button
                          outlined
                          sm
                          className="block-full mt-1"
                          disabled={!!qrLink}
                          theme="primary"
                          onClick={handleRequestQrCode}
                        >
                          Show QR
                        </Button>
                      )}
                    </div>
                  </Container>
                </li>

                <li>
                  <Text className="mt-6 mb-4">Enter the 6-digit code from Authenticator</Text>

                  <form onSubmit={formik.handleSubmit}>
                    <Input
                      error={formik.touched.twoFactorPin && formik.errors.twoFactorPin}
                      id="two-factor-pin"
                      name="twoFactorPin"
                      placeholder="Enter 6-digit code"
                      type="text"
                      value={formik.values.twoFactorPin}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onPaste={formik.handleBlur}
                      onPasteButtonClick={(text) => formik.setFieldValue('twoFactorPin', text)}
                    />

                    <Button sm className="block-full mt-4" disabled={!qrLink} theme="primary" type="submit">
                      Confirm
                    </Button>
                  </form>
                </li>
              </ol>
            </div>
          </div>
        </>
      )}

      {isConnected && (
        <>
          <Text className="mb-4" color="secondary">
            Great! You have connected two-step verification. The next time you log in, you'll be prompted to enter a
            code from Google Authenticator.
          </Text>
          <Text className="mb-4" color="secondary">
            If you lose access to the two-step verification device, you can use the recovery code to log in.{' '}
            <span className="font-weight-500 text-black">
              We strongly recommend that you download the recovery codes before proceeding.
            </span>
          </Text>

          <Button className="block-full mb-5" theme="primary" onClick={handleRequestRecoveryCodes}>
            Download recovery codes
          </Button>

          <Link className="block-full text-center" to="/login">
            Continue
          </Link>
        </>
      )}
    </Container>
  );
};
