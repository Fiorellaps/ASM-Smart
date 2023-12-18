import React, { useMemo } from 'react';

import { MaterialReactTable } from 'material-react-table';

import { SingleTestEntity } from './test-list.vm';
//import { test_avatar } from 'assets/img/test_avatar.png';
import { Box } from '@mui/material';

interface Props {
  tests: SingleTestEntity[];
}

export const UrlFailedTable: React.FC<Props> = (props) => {
  const { tests } = props;

  const columns = useMemo(
    () => [
      {
        accessorKey: 'url',
        header: 'Url',
      },
      {
        accessorKey: 'class',
        header: 'Clasificación',
      },
      {
        accessorFn: (row) => `${row.top_words}`, //accessorFn used to join multiple data into a single cell
        id: 'top_words', //id is still required when using accessorFn instead of accessorKey
        header: 'Palabras más comúnes',
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span>{renderedCellValue.replaceAll(',', ', ')}</span>
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
        enableColumnFilterModes={false}
        enableColumnOrdering={false}
        enableGrouping={false}
        enablePinning={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enablePagination={false}
        enableTopToolbar={false}
        enableToolbarInternalActions={false}
      />
    </>
  );
};
