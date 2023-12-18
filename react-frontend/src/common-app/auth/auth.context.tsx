import React from 'react';
import { UserSession, createEmptyUserSession } from './auth.vm';

interface Context extends UserSession {
  setUserSession: (userSession: UserSession) => void;
  isAuthenticated: boolean;
  roles: String[];
  tags: String[];
  id: string;
  active: Boolean;
}

const noUserLogin = 'no username login';

export const AuthContext = React.createContext<Context>({
  userName: noUserLogin,
  roles: [],
  tags: [],
  id: '',
  active: false,
  isAuthenticated: false,
  setUserSession: () =>
    console.warn(
      'If you area reading this, likely you forgot to add the provider on top of your app'
    ),
});

interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userSession, setUserSession] = React.useState<UserSession>(
    createEmptyUserSession()
  );

  const isAuthenticated = React.useMemo<boolean>(
    () => userSession.userName !== noUserLogin && userSession.userName !== '',
    [userSession.userName]
  );

  return (
    <AuthContext.Provider
      value={{
        userName: userSession.userName,
        roles: userSession.roles,
        tags: userSession.tags,
        id: userSession.id,
        active: userSession.active,
        isAuthenticated,
        setUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
