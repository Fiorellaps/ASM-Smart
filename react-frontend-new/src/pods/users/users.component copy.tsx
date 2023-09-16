import React from "react";
import { Link } from "react-router-dom";
import { routes } from "core";
import { UserDetailEntity } from "./users.vm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  users: UserDetailEntity[];
}

export const UserComponent: React.FC<Props> = (props) => {
  const { users } = props;

  return (
    <>
      <h2>Hello from Users page</h2>

      <Link to={routes.list}>Back to list page</Link>
      <List>
        {users.map((user, index) => (
          <>
            <ListItem key={index} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};
