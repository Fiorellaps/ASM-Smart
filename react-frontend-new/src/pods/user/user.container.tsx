import React from "react";
import { UserEntity } from "./user.vm";
import { UserComponent } from "./user.component";
import { getUserById } from "./user.repository";
import { createEmptyUser } from "./user.vm";
import { useParams } from "react-router-dom";
import { isEditModeHelper } from "common/helpers";
import { useSnackbarContext } from "common/components";

export const UserContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = React.useState<UserEntity>(createEmptyUser);
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const { showMessage } = useSnackbarContext();

  React.useEffect(() => {
    const isEditMode = isEditModeHelper(id);
    setIsEditMode(isEditMode);
    if (isEditMode) {
      try {
        getUserById(id).then((memberDetail) => setUser(memberDetail));
      } catch (error) {
        error &&
          showMessage("Ha ocurrido un error al cargar el empleado", "error");
      }
    }
  }, []);

  return <UserComponent users={users} />;
};
