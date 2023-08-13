import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "core";
import { ProfileContext } from "@/core/profile";
import { LoginComponent } from "./login.component";
import { doLogin } from "./login.api";
import { Login } from "./login.vm";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const useLoginHook = () => {
  const navigate = useNavigate();
  const { setUserProfile } = React.useContext(ProfileContext);

  const loginSucceededAction = (user) => {
    setUserProfile({
      userName: user.username,
      roles: user.roles,
      tags: user.tags,
    });
    navigate(routes.list);
  };

  const loginFailedAction = () => {
    alert("Usuario o contraseña no válidos.");
    /*<Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>;*/
  };
  return { loginSucceededAction, loginFailedAction };
};

export const LoginContainer: React.FC = () => {
  const { loginSucceededAction, loginFailedAction } = useLoginHook();

  const handleLogin = (login: Login) => {
    const { username, password } = login;
    doLogin(username, password).then((result) => {
      if (result) {
        console.log("result", result);
        loginSucceededAction(result);
      } else {
        loginFailedAction();
      }
    });
  };

  return <LoginComponent onLogin={handleLogin} />;
};
