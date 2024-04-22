import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CustomTableRow from '../../molecules/customTableRow/CustomTableRow';

const CustomTable = ({
  columns = [],
  rows = [],
  onClickRow,
  showAdd = false,
  showDelete = false,
  onDeleteRow
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
            showAdd={showAdd}
            showDelete={showDelete}
            onDeleteRow={onDeleteRow}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default CustomTable;
