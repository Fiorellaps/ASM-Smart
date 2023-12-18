import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserEntity } from './user-list.vm';
import { UserListComponent } from './user-list.component';
import { getUserCollection } from './user-list.repository';

import { useSnackbarContext } from 'common/components';
import { trackPromise } from 'react-promise-tracker';
import { mapUserCollectionFromApiToVm } from './user-list.mappers';
import { routes } from 'core/router';
const editEmployeeId = '0';

export const UserListContainer: React.FunctionComponent = () => {
  const [users, setUsers] = React.useState<UserEntity[]>([]);
  const { showMessage } = useSnackbarContext();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate(routes.editUser(editEmployeeId));
  };

  const handleEdit = (id: string) => {
    navigate(routes.editUser(id));
  };

  const handleDelete = async (id: string) => {
    const errorMessage = 'Error al eliminar un empleado';
    try {
      console.log('deleting...');
      //const isDeleted = await trackPromise(deleteEmployee(id));
      //isDeleted ? onLoadEmployeeList() : showMessage(errorMessage, 'error');
    } catch (error) {
      error && showMessage(errorMessage, 'error');
    }
  };

  React.useEffect(() => {
    getUserCollection().then((memberDetail) => setUsers(memberDetail));
  }, []);
  //return <UserListComponent users={users} />;
  return (
    <>
      {console.log('users', users)}
      <UserListComponent
        users={users}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
