import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';
import { routes } from 'core/router';
import { literals } from 'core/i18n';
import { AuthContext } from 'common-app/auth';
import { useSnackbarContext } from 'common/components';
import { isValidLogin } from './login.api';
import { LoginComponent } from './login.component';
import { Login } from './login.vm';
import { mapLoginResponseToUserSession } from './login.mapper';
import { UserSession } from 'common-app/auth';

export const LoginContainer: React.FunctionComponent = () => {
  const { setUserSession } = React.useContext(AuthContext);
  const { showMessage } = useSnackbarContext();
  const navigate = useNavigate();

  // TODO: Pending to implement with real data
  const loginSucceeded = (loginResult: UserSession): void => {
    if (loginResult.userName) {
      const userSession = mapLoginResponseToUserSession();
      userSession.userName = loginResult.userName;
      userSession.tags = loginResult.tags;
      userSession.roles = loginResult.roles;
      userSession.id = loginResult.id;
      userSession.active = loginResult.active;
      setUserSession(userSession);
      navigate(routes.tests);
    } else {
      console.log(loginResult);
      //showMessage(literals.messages.errors.invalidLogin, 'error');
      const userSession = mapLoginResponseToUserSession();
      userSession.userName = 'test';
      userSession.tags = ['test'];
      userSession.roles = ['admim'];
      userSession.id = '34';
      userSession.active = true;
      setUserSession(userSession);
      navigate(routes.tests);
    }
  };

  const handleLogin = (login: Login) => {
    const user = { userName: '' };
    loginSucceeded(user);

    /*trackPromise(isValidLogin(login.username, login.password)).then(
      (result) => {
        loginSucceeded(result);
      }
    );*/
  };

  return <LoginComponent onLogin={handleLogin} />;
};
