import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'core/router';
import { UserEntity } from './user-list.vm';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  ListItemIcon,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import { ModeEdit, Delete, GroupAdd } from '@mui/icons-material';
//import { user_avatar } from 'assets/img/user_avatar.png';

interface Props {
  users: UserEntity[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserListComponent: React.FC<Props> = (props) => {
  const { users, onCreate, onEdit, onDelete } = props;

  const columns = useMemo(
    () => [
      {
        id: 'user', //id used to define `group` column
        header: 'Usuario',
        enableClickToCopy: true,
        columns: [
          {
            accessorKey: 'active',
            header: 'Estado',
            size: 100,
            Cell: ({ cell }) => {
              const box_result = cell.getValue() ? (
                <Box
                  component="span"
                  sx={(theme) => ({
                    backgroundColor: theme.palette.success.dark,
                    borderRadius: '0.25rem',
                    color: '#fff',
                    maxWidth: '9ch',
                    margin: '0.5em',
                    padding: '0.25rem',
                  })}
                >
                  Activo
                </Box>
              ) : (
                <Box
                  component="span"
                  sx={(theme) => ({
                    backgroundColor: theme.palette.error.dark,
                    borderRadius: '0.25rem',
                    color: '#fff',
                    maxWidth: '9ch',
                    margin: '0.5em',
                    padding: '0.25rem',
                  })}
                >
                  Inactivo
                </Box>
              );
              return box_result;
            },
          },
          {
            accessorFn: (row) => `${row.username}`, //accessorFn used to join multiple data into a single cell
            id: 'username', //id is still required when using accessorFn instead of accessorKey
            header: 'Nombre',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          /* {
            accessorFn: (row) => `${row.email}`, //accessorFn used to join multiple data into a single cell
            id: "email", //id is still required when using accessorFn instead of accessorKey
            header: "Correo",
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },*/

          {
            accessorKey: 'roles',
            header: 'Roles',
            size: 100,
            //custom conditional format and styling
            Cell: ({ cell }) => {
              let box_list = [];

              const roles_list = cell.getValue();
              const max_boxes = 4;
              for (let i = 0; i < roles_list.length; i++) {
                if (i < max_boxes) {
                  box_list.push(
                    <Box
                      component="span"
                      sx={(theme) => ({
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '9ch',
                        margin: '0.5em',
                        padding: '0.25rem',
                      })}
                    >
                      {roles_list[i]}
                    </Box>
                  );
                } else {
                  break; // Rompe el bucle si ya ha superado el max_boxes
                }
              }
              return (
                <Box display="flex" flexDirection="row">
                  {box_list.map((box, index) => box)}
                </Box>
              );
            },
          },
        ],
      },
      {
        id: 'tours',
        header: 'Tours info',
        columns: [
          {
            accessorKey: 'tags',
            header: 'Tags',
            size: 350,
            Cell: ({ cell }) => {
              let box_list = [];

              const tags_list = cell.getValue();
              const max_boxes = 4;
              for (let i = 0; i < tags_list.length; i++) {
                if (i < max_boxes) {
                  box_list.push(
                    <Box
                      component="span"
                      sx={(theme) => ({
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '9ch',
                        margin: '0.5em',
                        padding: '0.25rem',
                      })}
                    >
                      {tags_list[i]}
                    </Box>
                  );
                } else {
                  break;
                }
              }
              return (
                <Box display="flex" flexDirection="row">
                  {box_list.map((box, index) => box)}
                </Box>
              );
            },
          },
        ],
      },
      {
        id: 'actions',
        header: 'Acciones',
        columns: [
          {
            accessorKey: 'acciones',
            enableColumnFilter: false,
            header: '',
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box display="flex" flexDirection="row">
                <Tooltip title="Editar">
                  <ListItemIcon>
                    <MenuItem to={routes.root} component={Link}>
                      <ModeEdit />
                    </MenuItem>
                  </ListItemIcon>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <ListItemIcon>
                    <MenuItem to={routes.root} component={Link}>
                      <Delete />
                    </MenuItem>
                  </ListItemIcon>
                </Tooltip>
              </Box>
            ),
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <h2>Gestión de usuarios</h2>
      <Box
        onClick={onCreate}
        component="button"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          borderRadius: '0.25rem',
          color: '#fff',
          margin: '1em',
          padding: '0.5rem',
        })}
      >
        <ListItemIcon>
          <MenuItem to={routes.root} component={Link}>
            <GroupAdd />
            <Typography m={0.5} color="common.white">
              Añadir Usuario
            </Typography>
          </MenuItem>
        </ListItemIcon>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enablePinning
        initialState={{ showColumnFilters: true }}
        positionToolbarAlertBanner="bottom"
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h6">
                  Usuario: {row.original.username}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  Tags: {row.original.tags.join(', ')}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      />
    </>
  );
};
