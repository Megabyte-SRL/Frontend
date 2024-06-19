import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CustomAddIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
}

export default CustomAddIcon;