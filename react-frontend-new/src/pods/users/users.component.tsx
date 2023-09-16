import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { routes } from "core";
import { UserDetailEntity } from "./users.vm";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/system";

import { MaterialReactTable } from "material-react-table";
import { Box, Button, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { AccountCircle, Delete, GroupAdd } from "@mui/icons-material";

interface Props {
  users: UserDetailEntity[];
}

export const UserComponent: React.FC<Props> = (props) => {
  const { users } = props;

  const columns = useMemo(
    () => [
      {
        id: "user", //id used to define `group` column
        header: "Usuario",
        enableClickToCopy: true,
        columns: [
          {
            accessorFn: (row) => `${row.username}`, //accessorFn used to join multiple data into a single cell
            id: "username", //id is still required when using accessorFn instead of accessorKey
            header: "Nombre",
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/*<img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: "50%" }}
              />*/}
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "roles",
            header: "Roles",
            size: 500,
            //custom conditional format and styling
            Cell: ({ cell }) => {
              let box_list = [];

              const roles_list = cell.getValue();
              console.log("roles_list", roles_list);
              const max_boxes = 4;
              for (let i = 0; i < roles_list.length; i++) {
                console.log("cell i", roles_list[i]);
                if (i < max_boxes) {
                  box_list.push(
                    <Box
                      component="span"
                      sx={(theme) => ({
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: "0.25rem",
                        color: "#fff",
                        maxWidth: "9ch",
                        margin: "0.5em",
                        padding: "0.25rem",
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
        id: "id",
        header: "Tours info",
        columns: [
          {
            accessorKey: "tags",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            //filterFn: "between",
            header: "Tags",
            size: 500,
            //custom conditional format and styling
            Cell: ({ cell }) => {
              let box_list = [];

              const tags_list = cell.getValue();
              const max_boxes = 4;
              for (let i = 0; i < tags_list.length; i++) {
                console.log("cell i", tags_list[i]);
                if (i < max_boxes) {
                  box_list.push(
                    <Box
                      component="span"
                      sx={(theme) => ({
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: "0.25rem",
                        color: "#fff",
                        maxWidth: "9ch",
                        margin: "0.5em",
                        padding: "0.25rem",
                      })}
                    >
                      {tags_list[i]}
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
        id: "id",
        header: "Acciones",
        columns: [
          {
            accessorKey: "acciones",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            //filterFn: "between",

            enableColumnFilter: false,
            header: "",
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box display="flex" flexDirection="row">
                <ListItemIcon>
                  <MenuItem to={routes.list} component={Link}>
                    <AccountCircle />
                  </MenuItem>
                </ListItemIcon>

                <ListItemIcon>
                  <MenuItem to={routes.list} component={Link}>
                    <Delete />
                  </MenuItem>
                </ListItemIcon>
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
        component="button"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          borderRadius: "0.25rem",
          color: "#fff",
          margin: "1em",
          padding: "0.5rem",
        })}
      >
        <ListItemIcon>
          <MenuItem to={routes.list} component={Link}>
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
        //enableRowActions
        //enableRowSelection
        initialState={{ showColumnFilters: true }}
        positionToolbarAlertBanner="bottom"
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">Detail:</Typography>
              <Typography variant="h1">Por Añadir</Typography>
            </Box>
          </Box>
        )}
        /*renderRowActionMenuItems={({ closeMenu }) => [
          <MenuItem
            key={0}
            onClick={() => {
              // View profile logic...
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            Editar
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              // DeleteIcon  email logic...
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            Eliminar
          </MenuItem>,
        ]}
        */
        /*renderTopToolbarCustomActions={({ table }) => {
          const handleDeactivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              alert("deactivating " + row.getValue("name"));
            });
          };

          const handleActivate = () => {
            table.getSelectedRowModel().flatRows.map((row) => {
              alert("activating " + row.getValue("name"));
            });
          };

          return (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Desactivar
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activar
              </Button>
            </div>
          );
        }}*/
      />
    </>
  );
};
