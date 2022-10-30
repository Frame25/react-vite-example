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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/auth',
        element: (
          <Suspense>
            <Auth />
          </Suspense>
        ),
        children: [
          {
            path: 'login',
            element: (
              <Suspense>
                <Login />
              </Suspense>
            ),
          },
          {
            path: 'setup-2fa',
            element: (
              <Suspense>
                <Setup2FA />
              </Suspense>
            ),
          },
          {
            path: 'sign-up',
            element: (
              <Suspense>
                <SignUp />
              </Suspense>
            ),
          },
          {
            path: 'forgot-password',
            element: (
              <Suspense>
                <ForgotPassword />
              </Suspense>
            ),
          },
          {
            path: 'reset-password',
            element: (
              <Suspense>
                <ResetPassword />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/manager',
        element: (
          <Suspense>
            <Manager />
          </Suspense>
        ),
        children: [
          {
            path: 'invite',
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
  '/': 'B2B Off-ramp',
  '/auth/login': 'Login',
  '/auth/setup-2fa': 'Setup 2FA',
  '/auth/sign-up': 'Sign up',
  '/auth/forgot-password': 'Reset password',
  '/auth/reset-password': 'Reset password',
};
