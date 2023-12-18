import React from 'react';
import { Drawer, IconButton, Typography } from '@mui/material';
import { SideListComponent } from './side-list.component';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  open: boolean;
  onClick: () => void;
  handleCollapseClick: () => void;
  collapseState: boolean;
}

export const SideMenuComponent: React.FC<Props> = ({
  open,
  onClick,
  handleCollapseClick,
  collapseState,
}) => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const customTheme = useTheme();

  return (
    <Drawer open={open}>
      <DrawerHeader>
        <IconButton onClick={onClick}>
          {customTheme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <SideListComponent
        onKeyDown={onClick}
        openCollapse={collapseState}
        handleCollapse={handleCollapseClick}
      />
    </Drawer>
  );
};
