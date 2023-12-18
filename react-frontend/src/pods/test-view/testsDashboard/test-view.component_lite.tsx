import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'core/router';
import { SingleTestEntity } from './test-list.vm';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  ListItemIcon,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';

import { DownloadAttachementDialog } from 'pods/test-view/testsDashboard/attachment-buttons-dialog';

import { theme } from 'core/theme';

//import { test_avatar } from 'assets/img/test_avatar.png';

interface Props {
  tests: SingleTestEntity[];
}

export const TestViewLiteComponent: React.FC<Props> = (props) => {
  const { tests } = props;

  const availability_threshold = {
    alert: theme.palette.error.dark,
    warning: '#FFCC00',
    correct: theme.palette.success.dark,
  };
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.fecha}`, //accessorFn used to join multiple data into a single cell
        id: 'fecha', //id is still required when using accessorFn instead of accessorKey
        header: 'Fecha',
        size: 120,
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
        accessorFn: (row) => `${row.disponibilidad}`, //accessorFn used to join multiple data into a single cell
        id: 'disponibilidad', //id is still required when using accessorFn instead of accessorKey
        header: 'Disponibilidad',
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              borderRadius: '0.25rem',
              color: '#fff',
              maxWidth: '9ch',
              margin: '0.5em',
              padding: '0.25rem',
              justifyContent: 'center',
              backgroundColor:
                parseFloat(renderedCellValue.replace('%', '')) < 70
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
      {
        accessorFn: (row) => `${row.duracionMedia}`, //accessorFn used to join multiple data into a single cell
        id: 'duracionMedia', //id is still required when using accessorFn instead of accessorKey
        header: 'Duración media',
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
      {
        accessorFn: (row) => `${row.totalErrores}`, //accessorFn used to join multiple data into a single cell
        id: 'totalErrores', //id is still required when using accessorFn instead of accessorKey
        header: 'Número de Errores',
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

      {
        accessorFn: (row) => `${row.totalMuestras}`, //accessorFn used to join multiple data into a single cell
        id: 'totalMuestras', //id is still required when using accessorFn instead of accessorKey
        header: 'Número de Muestras',
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

      {
        accessorKey: 'Visualizar',
        enableColumnFilter: false,
        header: 'Ficheros adjuntos',
        size: 80,
        //custom conditional format and styling
        Cell: ({ cell, row }) => (
          <Box display="flex" flexDirection="row">
            <Tooltip title="Visualizar Ficheros adjuntos">
              <ListItemIcon>
                <DownloadAttachementDialog />
              </ListItemIcon>
            </Tooltip>
          </Box>
        ),
      },
    ],
    []
  );

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
          showColumnFilters: false,
          columnVisibility: {
            tags: false,
            activo: false,
          },
          sorting: [{ id: 'fecha', desc: true }],
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
                  Test : {row.original.nombreTest};
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
