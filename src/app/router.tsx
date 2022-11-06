import {lazy, Suspense} from 'react';
import {createBrowserRouter} from 'react-router-dom';

import {PageNotFound} from 'pages/404';
import {Home} from 'pages/home';

import {Role} from 'entities/user/permissions';

import {PermissionGuard} from 'shared/ui/permission-guard';

import {Root} from './ui/Root';

const Auth = lazy(() => import('pages/auth').then((r) => ({default: r.Auth})));
const Login = lazy(() => import('pages/auth').then((r) => ({default: r.Login})));
const Setup2FA = lazy(() => import('pages/auth').then((r) => ({default: r.Setup2FA})));
const SignUp = lazy(() => import('pages/auth').then((r) => ({default: r.SignUp})));
const ForgotPassword = lazy(() => import('pages/auth').then((r) => ({default: r.ForgotPassword})));
const ResetPassword = lazy(() => import('pages/auth').then((r) => ({default: r.ResetPassword})));

const Manager = lazy(() => import('pages/manager').then((r) => ({default: r.Manager})));
const Invite = lazy(() => import('pages/manager').then((r) => ({default: r.Invite})));

export enum RoutePath {
  Root = '/',
  Auth = '/auth',
  Login = '/auth/login',
  Setup2FA = '/auth/setup-2fa',
  SignUp = '/auth/sign-up',
  ForgotPassword = '/auth/forgot-password',
  ResetPassword = '/auth/reset-password',
  Manager = '/manager',
  Invite = '/manager/invite',
}

export const router = createBrowserRouter([
  {
    path: RoutePath.Root,
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: RoutePath.Root,
        element: <Home />,
      },
      {
        path: RoutePath.Auth,
        element: (
          <Suspense>
            <Auth />
          </Suspense>
        ),
        children: [
          {
            path: RoutePath.Login,
            element: (
              <Suspense>
                <Login />
              </Suspense>
            ),
          },
          {
            path: RoutePath.Setup2FA,
            element: (
              <Suspense>
                <Setup2FA />
              </Suspense>
            ),
          },
          {
            path: RoutePath.SignUp,
            element: (
              <Suspense>
                <SignUp />
              </Suspense>
            ),
          },
          {
            path: RoutePath.ForgotPassword,
            element: (
              <Suspense>
                <ForgotPassword />
              </Suspense>
            ),
          },
          {
            path: RoutePath.ResetPassword,
            element: (
              <Suspense>
                <ResetPassword />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: RoutePath.Manager,
        element: (
          <Suspense>
            <Manager />
          </Suspense>
        ),
        children: [
          {
            path: RoutePath.Invite,
            element: (
              <Suspense>
                <PermissionGuard roles={[Role.ADMIN]}>
                  <Invite />
                </PermissionGuard>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export const TITLES_TO_ROUTES: Record<string, string> = {
  [RoutePath.Root]: 'B2B Off-ramp',
  [RoutePath.Login]: 'Login',
  [RoutePath.Setup2FA]: 'Setup 2FA',
  [RoutePath.SignUp]: 'Sign up',
  [RoutePath.ResetPassword]: 'Reset password',
  [RoutePath.ForgotPassword]: 'Reset password',
  [RoutePath.Invite]: 'Invite new user',
};
