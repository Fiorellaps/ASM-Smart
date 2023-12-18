import React, { useMemo } from 'react';

import { MaterialReactTable } from 'material-react-table';
import moment from 'moment';
import { theme } from 'core/theme';
import { DownloadAttachementDialog } from 'pods/test-view/testsDashboard/attachment-buttons-dialog';

import { SingleTestEntity } from './test-list.vm';
import { Box, ListItemIcon, Tooltip } from '@mui/material';
//import { test_avatar } from 'assets/img/test_avatar.png';

interface Props {
  tests: SingleTestEntity[];
}

export const HarsTable: React.FC<Props> = (props) => {
  const { tests } = props;
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
        accessorFn: (row) => `${row.date}`, //accessorFn used to join multiple data into a single cell
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
            <span>{format_date(renderedCellValue)}</span>
          </Box>
        ),
      },

      {
        accessorFn: (row) => `${row.server_response_code}`, //accessorFn used to join multiple data into a single cell
        id: 'server_response_code', //id is still required when using accessorFn instead of accessorKey
        header: 'Server Response',
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
                parseFloat(renderedCellValue.replace('%', '')) < 300
                  ? availability_threshold['correct']
                  : parseFloat(renderedCellValue.replace('%', '')) < 400
                  ? availability_threshold['warning']
                  : availability_threshold['alert'],
            }}
          >
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.server_response_message}`, //accessorFn used to join multiple data into a single cell
        id: 'server_response_message', //id is still required when using accessorFn instead of accessorKey
        header: 'Server Message',
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>{renderedCellValue}s</span>
          </Box>
        ),
      },
      {
        accessorFn: (row) => `${row.status_text}`, //accessorFn used to join multiple data into a single cell
        id: 'status_text', //id is still required when using accessorFn instead of accessorKey
        header: 'Texto',
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
        accessorFn: (row) => `${row.url}`, //accessorFn used to join multiple data into a single cell
        id: 'url', //id is still required when using accessorFn instead of accessorKey
        header: 'URL',
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
          sorting: [
            { id: 'server_response_code', desc: true },
            { id: 'fecha', desc: true },
          ],
        }}
        positionToolbarAlertBanner="bottom"
        /*renderDetailPanel={({ row }) => (
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
        )}*/
      />
    </>
  );
};
