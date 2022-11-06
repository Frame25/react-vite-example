import cn from 'classnames';
import {FunctionComponent, lazy, Suspense, SVGProps} from 'react';

// import {ReactComponent as AppstoreIcon} from 'shared/assets/icons/appstore.svg';
// import {ReactComponent as Arrow} from 'shared/assets/icons/arrow.svg';
// import {ReactComponent as CheckBase} from 'shared/assets/icons/check-base.svg';
// import {ReactComponent as CrossEyeIcon} from 'shared/assets/icons/eye-cross.svg';
// import {ReactComponent as EyeIcon} from 'shared/assets/icons/eye.svg';
// import {ReactComponent as GoogleAuthenticatorIcon} from 'shared/assets/icons/google-authenticator.svg';
// import {ReactComponent as GooglePlayIcon} from 'shared/assets/icons/google-play.svg';
// import {ReactComponent as PhotoCameraIcon} from 'shared/assets/icons/photo-camera.svg';
// import {ReactComponent as PlusIcon} from 'shared/assets/icons/plus.svg';
// import {ReactComponent as Logo} from 'shared/assets/logo.svg';

import styles from './Icon.module.scss';

const resolveLazySVG = (promise: Promise<any>) => promise.then((res: any) => ({default: res.ReactComponent}));

const Logo = lazy(() => resolveLazySVG(import('shared/assets/logo.svg')));
const AppstoreIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/appstore.svg')));
const Arrow = lazy(() => resolveLazySVG(import('shared/assets/icons/arrow.svg')));
const CheckBase = lazy(() => resolveLazySVG(import('shared/assets/icons/check-base.svg')));
const CrossEyeIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/eye-cross.svg')));
const EyeIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/eye.svg')));
const GoogleAuthenticatorIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/google-authenticator.svg')));
const GooglePlayIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/google-play.svg')));
const PhotoCameraIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/photo-camera.svg')));
const PlusIcon = lazy(() => resolveLazySVG(import('shared/assets/icons/plus.svg')));
const X = lazy(() => resolveLazySVG(import('shared/assets/icons/x.svg')));

export type IconName =
  | 'eye'
  | 'eye-cross'
  | 'photo-camera'
  | 'appstore'
  | 'google-play'
  | 'google-authenticator'
  | 'plus'
  | 'logo'
  | 'check-base'
  | 'arrow'
  | 'x';

export type IconColor =
  | 'danger'
  | 'warning'
  | 'success'
  | 'primary'
  | 'blueLight'
  | 'blueLighten'
  | 'white'
  | 'secondary'
  | 'secondary2'
  | 'disabled'
  | 'greyLight'
  | 'black';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const icons: Record<string, FunctionComponent> = {
  eye: EyeIcon,
  'eye-cross': CrossEyeIcon,
  'photo-camera': PhotoCameraIcon,
  appstore: AppstoreIcon,
  'google-play': GooglePlayIcon,
  'google-authenticator': GoogleAuthenticatorIcon,
  plus: PlusIcon,
  logo: Logo,
  'check-base': CheckBase,
  arrow: Arrow,
  x: X,
};

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  icon: IconName;
  size?: IconSizes | null;
  color?: IconColor | null;
  rotate?: number;
};

const iconSizes = {
  xxs: styles.Icon_xxs,
  xs: styles.Icon_xs,
  sm: styles.Icon_sm,
  md: styles.Icon_md,
  lg: styles.Icon_lg,
  xl: styles.Icon_xl,
  xxl: styles.Icon_xxl,
};

const iconColors = {
  danger: styles.Icon_danger,
  warning: styles.Icon_warning,
  success: styles.Icon_success,
  primary: styles.Icon_primary,
  blueLight: styles.Icon_blueLight,
  blueLighten: styles.Icon_blueLighten,
  white: styles.Icon_white,
  secondary: styles.Icon_secondary,
  secondary2: styles.Icon_secondary2,
  disabled: styles.Icon_disabled,
  greyLight: styles.Icon_greyLight,
  black: styles.Icon_black,
};

export const Icon = ({icon, size = null, color = null, style, rotate, className, ...rest}: IconProps) => {
  const IconSVG = icons[icon];

  if (rotate) {
    style = {...(style || {}), transform: `rotate(${rotate}deg)`};
  }

  return (
    <i className={cn(styles.Icon, color && iconColors[color], size && iconSizes[size], className)} style={style}>
      <Suspense fallback="">
        <IconSVG {...rest} />
      </Suspense>
    </i>
  );
};
