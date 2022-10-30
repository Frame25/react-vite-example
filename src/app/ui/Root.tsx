import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

import {TITLES_TO_ROUTES} from 'app/router';

import {userModel} from 'entities/user';

import {useObserveScreenSize, ScreenSizeContext} from 'shared/lib/responsive.helpers';
import {useMemorizedRoute} from 'shared/lib/router.helpers';

export const Root = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const {setMemoRoute} = useMemorizedRoute();
  const screenSize = useObserveScreenSize();

  useEffect(() => {
    // Main routes Guards:
    if (!userModel.token && !/^\/auth\/.+/.test(location.pathname)) {
      setMemoRoute();
      navigate('/auth/login');
    }

    if (userModel.token && !userModel.data?.two_factor_paired && !/^\/auth\/setup-2fa\/?/.test(location.pathname)) {
      navigate('/auth/setup-2fa');
    }

    //
    window.document.title = TITLES_TO_ROUTES[location.pathname] || TITLES_TO_ROUTES['/'];
  }, [location, navigate, setMemoRoute]);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      <Outlet />
    </ScreenSizeContext.Provider>
  );
});
