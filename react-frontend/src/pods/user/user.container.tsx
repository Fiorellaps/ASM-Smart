import React from 'react';
import { UserComponent } from './user.component';
import { UserEntity, createEmptyUser } from './user.vm';
import { useSnackbarContext } from 'common/components';
import { trackPromise } from 'react-promise-tracker';
import { getUserById } from './api';
import { mapUserFromApiToVm } from './user.mappers';
import { useParams } from 'react-router-dom';
import { isEditModeHelper } from 'common/helpers';

export const UserContainer: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = React.useState<UserEntity>(createEmptyUser());
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const { showMessage } = useSnackbarContext();

  const onLoadUser = async () => {
    try {
      const apiUser = await trackPromise(getUserById(id));
      const viewModelUser = mapUserFromApiToVm(apiUser);
      setUser(viewModelUser);
    } catch (error) {
      error &&
        showMessage('Ha ocurrido un error al cargar el usuario', 'error');
    }
  };

  const handleSave = (user: UserEntity) => {
    console.log('Guardado');
  };

  const handleCancel = () => {
    history.back();
  };

  React.useEffect(() => {
    const isEditMode = isEditModeHelper(id);
    setIsEditMode(isEditMode);
    if (isEditMode) {
      onLoadUser();
    }
  }, []);

  return (
    <UserComponent
      user={user}
      isEditMode={isEditMode}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
