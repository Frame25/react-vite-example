import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

import {RoutePath, TITLES_TO_ROUTES} from 'app/router';

import {userModel} from 'entities/user';

import {notifications} from 'shared/lib/notification';
import {useObserveScreenSize, ScreenSizeContext} from 'shared/lib/responsive.helpers';
import {AlertContainer} from 'shared/ui/alert';

export const Root = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const screenSize = useObserveScreenSize();

  useEffect(() => {
    // Main routes Guards:
    if (!userModel.token && !/^\/auth\/(login|sign-up)/.test(location.pathname)) {
      navigate(RoutePath.Login);
    }

    if (userModel.token && !userModel.data?.two_factor_paired && !/^\/auth\/setup-2fa\/?/.test(location.pathname)) {
      navigate(RoutePath.Setup2FA);
    }

    if (userModel.token && /^\/auth\/(login|sign-up)/.test(location.pathname)) {
      notifications.info({title: 'You have already authorized'});
      navigate(RoutePath.Root);
    }

    if (userModel.token && userModel.data?.two_factor_paired && location.pathname === '/auth/setup-2fa') {
      navigate(RoutePath.Root);
    }

    window.document.title = TITLES_TO_ROUTES[location.pathname] || TITLES_TO_ROUTES[RoutePath.Root];
  }, [location, navigate]);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      <Outlet />
      <AlertContainer align="right" list={notifications.list} />
    </ScreenSizeContext.Provider>
  );
});
