import React from 'react';
import { TableCell, TableRow } from '@mui/material';

import CustomDeleteIcon from '../../atoms/customDeleteIcon/CustomDeleteIcon';
import CustomAddIcon from '../../atoms/customAddIcon/CustomAddIcon';

const CustomTableRow = ({
  columns = [],
  row = {},
  onClickRow,
  showAdd = false,
  onClickAddRow = () => {},
  showDelete = false,
  onDeleteRow
}) => (
  <TableRow key={row.id} onClick={() => onClickRow(row)}>
    {columns.map((column) => (
      <TableCell key={column.id}>
        {row[column.id]}
      </TableCell>
    ))}
    {showAdd ?(
      <TableCell key={row.id}>
        <CustomAddIcon onClick={onClickAddRow}/>
      </TableCell>
    ) : (
      <></>
    )}
    {showDelete ? (
      <TableCell key={row.id}>
        <CustomDeleteIcon onClick={() => onDeleteRow(row.id)}/>
      </TableCell>
    ) : (
      <></>
    )}
  </TableRow>
);

export default CustomTableRow;
