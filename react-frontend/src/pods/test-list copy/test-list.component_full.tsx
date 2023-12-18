import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { MaterialReactTable } from 'material-react-table';
import moment from 'moment';
import { theme } from 'core/theme';

import { routes } from 'core/router';
import { SingleTestEntity } from './test-list.vm';
import {
  Box,
  ListItemIcon,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  RemoveRedEye,
  CheckCircleOutline,
  Close,
  DoNotDisturbOn,
} from '@mui/icons-material';
//import { test_avatar } from 'assets/img/test_avatar.png';

interface Props {
  tests: SingleTestEntity[];
  nombreEntorno: String;
}

export const TestListFullComponent: React.FC<Props> = (props) => {
  const { tests, nombreEntorno } = props;
  const format_date = (fecha) => {
    const DateHourMoment = moment(fecha);
    const newDateHourFormatted = DateHourMoment.format('DD/MM/YYYY HH:mm:ss');

    return newDateHourFormatted;
  };
  const availability_threshold = {
    alert: theme.palette.error.dark,
    warning: '#FFCC00',
    correct: theme.palette.success.dark,
  };

  const columns = useMemo(
    () => [
      {
        id: 'metadata', //id used to define `group` column
        header: 'Metadatos',
        enableClickToCopy: true,
        columns: [
          {
            accessorFn: (row) => `${row.nombreTest}`, //accessorFn used to join multiple data into a single cell
            id: 'nombreTest', //id is still required when using accessorFn instead of accessorKey
            header: 'Test',
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
          {
            accessorKey: 'errorUltimaEjecucion',
            header: 'Estado',
            size: 100,
            Cell: ({ cell, row }) => {
              const box_result =
                cell.getValue() && row.original.total > 0 ? (
                  <Box
                    component="span"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.error.dark,
                      borderRadius: '0.25rem',
                      color: '#fff',
                      maxWidth: '9ch',
                      margin: '0.5em',
                      padding: '0.25rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    })}
                  >
                    <Close />
                  </Box>
                ) : !cell.getValue() && row.original.total > 0 ? (
                  <Box
                    component="span"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.success.dark,
                      borderRadius: '0.25rem',
                      color: '#fff',
                      maxWidth: '9ch',
                      margin: '0.5em',
                      padding: '0.25rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    })}
                  >
                    <CheckCircleOutline />
                  </Box>
                ) : (
                  <Box
                    component="span"
                    sx={(theme) => ({
                      //backgroundColor: theme.palette.success.dark,
                      borderRadius: '0.25rem',
                      color: '#fff',
                      maxWidth: '9ch',
                      margin: '0.5em',
                      padding: '0.25rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    })}
                  >
                    <DoNotDisturbOn style={{ color: 'red' }} />
                  </Box>
                );
              return box_result;
            },
          },
          {
            accessorKey: 'tags',
            header: 'Tags',
            size: 250,
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
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: '0.25rem',
                        color: '#fff',
                        maxWidth: '10ch',
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
          {
            accessorKey: 'activo',
            header: '',
            enableColumnFilter: false,
            size: 20,
            Cell: ({ cell }) => {
              const box_result = cell.getValue() ? (
                ''
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    justifyContent: 'center',
                    borderRadius: '0.25rem',
                    color: '#fff',
                    maxWidth: '9ch',
                    margin: '0.5em',
                    padding: '0.25rem',
                    backgroundColor: availability_threshold['warning'],
                  }}
                >
                  <span>Inactivo</span>
                </Box>
              );
              return box_result;
            },
          },
        ],
      },
      {
        id: 'disponibilidad',
        header: 'Disponibilidad',
        columns: [
          {
            accessorFn: (row) => `${row.porcentajeCorrecto}`, //accessorFn used to join multiple data into a single cell
            id: 'porcentajeCorrecto', //id is still required when using accessorFn instead of accessorKey
            header: 'Porcentaje Correcto',
            size: 50,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  margin: '0.5em',
                  padding: '0.25rem',
                  backgroundColor:
                    parseFloat(renderedCellValue.replace('%', '')) < 80
                      ? availability_threshold['alert']
                      : parseFloat(renderedCellValue.replace('%', '')) > 90
                      ? availability_threshold['correct']
                      : availability_threshold['warning'],
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },

      },
      {
        id: 'tiempos',
        header: 'Tiempos Última Ejecución',
        columns: [
          {
            accessorFn: (row) => `${row.fechaUltimaEjecucion}`, //accessorFn used to join multiple data into a single cell
            id: 'fechaUltimaEjecucion', //id is still required when using accessorFn instead of accessorKey
            header: 'Fecha',
            size: 200,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span>{format_date(renderedCellValue)}</span>
              </Box>
            ),
          },
          {
            accessorFn: (row) => `${row.duracionUltimaEjecucion}`, //accessorFn used to join multiple data into a single cell
            id: 'duracionUltimaEjecucion', //id is still required when using accessorFn instead of accessorKey
            header: 'Duración',
            size: 50,
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
        ],
      },
      {
        id: 'id',
        header: 'Acciones',
        columns: [
          {
            accessorKey: 'Visualizar',
            enableColumnFilter: false,
            header: '',
            size: 80,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box display="flex" flexDirection="row">
                <Tooltip title="Visualizar">
                  <ListItemIcon>
                    <MenuItem to={routes.root} component={Link}>
                      <RemoveRedEye />
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
  const getRowProps = (params) => {
    if (params.getValue('errorUltimaEjecucion')) {
      return { style: { backgroundColor: 'yellow' } }; // Change the color as needed
    }
    return {};
  };
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tests}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enablePinning
        initialState={{
          showColumnFilters: true,
          columnVisibility: {
            tags: true,

          },
          sorting: [{ id: 'fechaUltimaEjecucion', desc: true }],
        }}
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
                  Usuario: {row.original.testname}
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
