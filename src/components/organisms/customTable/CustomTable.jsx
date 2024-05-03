import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import CustomTableRow from '../../molecules/customTableRow/CustomTableRow';

const CustomTable = ({
  columns = [],
  rows = [],
  onClickRow,
}) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <CustomTableRow
              key={row.id}
              columns={columns}
              row={row}
              onClickRow={onClickRow}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        rowsPerPage={10}
        page={0}
        labelRowsPerPage='Filas por página:'
      />
    </TableContainer>
  );
};

export default CustomTable;
