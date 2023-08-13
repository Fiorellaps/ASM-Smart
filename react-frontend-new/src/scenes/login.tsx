import React from "react";
import { LoginContainer } from "@/pods/login";
import { CenterLayout, SimpleLayout } from "@/layouts";

export const LoginPage: React.FC = () => {
  return (
    <SimpleLayout>
      <CenterLayout>
        <LoginContainer />
      </CenterLayout>
    </SimpleLayout>
  );
};
