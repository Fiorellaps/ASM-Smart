import React from 'react';
import { AppBar } from '@mui/material';
import {
  TabComponent,
  TabListComponent,
  TabPanelComponent,
} from 'common/components';
import { DataComponent } from './components';
import { UserEntity } from './user.vm';
import * as classes from './user.styles';

interface Props {
  user: UserEntity;
  isEditMode: boolean;
  onSave: (user: UserEntity) => void;
  onCancel: () => void;
}

export const UserComponent: React.FunctionComponent<Props> = ({
  user,
  isEditMode,
  onSave,
  onCancel,
}) => {
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <AppBar position="static">
        <TabListComponent value={tab} onChange={setTab}>
          <TabComponent label="Datos" />
        </TabListComponent>
      </AppBar>
      <TabPanelComponent value={tab} index={0}>
        <DataComponent
          user={user}
          className={classes.root}
          onSave={onSave}
          isEditMode={isEditMode}
          onCancel={onCancel}
        />
      </TabPanelComponent>
    </>
  );
};
