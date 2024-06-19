import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomDeleteIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
}

export default CustomDeleteIcon;
