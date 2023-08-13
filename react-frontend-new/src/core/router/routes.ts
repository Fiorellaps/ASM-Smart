import { generatePath } from "react-router-dom";

interface SwitchRoutes {
  root: string;
  list: string;
  details: string;
  users: string;
}

export const switchRoutes: SwitchRoutes = {
  root: "/",
  list: "/list",
  details: "/detail/:id",
  users: "/users",
};

interface Routes extends Omit<SwitchRoutes, "details"> {
  details: (id: string) => string;
}

export const routes: Routes = {
  ...switchRoutes,
  details: (id) => generatePath(switchRoutes.details, { id }),
};
