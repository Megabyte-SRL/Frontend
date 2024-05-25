import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField
} from '@mui/material';

import CustomTableRow from '../../molecules/customTableRow/CustomTableRow';

const CustomSearchableTable = ({
  columns = [],
  data = [],
  order,
  orderBy,
  onSort,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  onFilterChange,
  searchText,
  onSearchChange,
  onClickRow,
}) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '.5rem' }}>
      <TextField
        label='Buscar'
        variant='outlined'
        fullWidth
        value={searchText}
        onChange={onSearchChange}
        sx={{ marginBottom: '1rem' }}
      />
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => onSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
                {column.filterable && (
                  <TextField
                    variant='standard'
                    onChange={(event) => onFilterChange(column.id, event.target.value)}
                    placeholder={`Filtrar ${column.label}`}
                    fullWidth
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
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
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage='Filas por página:'
      />
    </TableContainer>
  );
};

export default CustomSearchableTable;
