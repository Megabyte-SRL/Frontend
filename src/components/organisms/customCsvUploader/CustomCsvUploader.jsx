import React, { useState } from 'react';

import { Alert, Button, Grid } from '@mui/material';
import { Box, Stack } from '@mui/system';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize
} from 'react-papaparse';
import { CloudUpload } from '@mui/icons-material';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
};

const CustomCsvUploader = ({ requiredColumns = [], setRows }) => {
  const [columnsValid, setColumnsValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );

  const handleFileLoad = (results) => {
    const errors = [];
    /*
    results.data.forEach((row, index) => {
      if (!row.Name) {
        errors.push(`Error en la fila ${index + 1}: el Nombre es requerido.`);
      }
      if (!row.Age || isNaN(Number(row.Age)) || Number(row.Age) <= 0) {
        errors.push(`Error en la fila ${index + 1}: La Edad debe ser mayor que 0.`);
      }
    });
    */

    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      //console.log('Data is valid: ', results);
      // Process the valid data as needed
      setRows(results.data);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <CSVReader
          onUploadAccepted={(results) => {
            handleFileLoad(results);
            setZoneHover(false);
          }}
          onDragOver={(event) => {
          event.preventDefault();
          setZoneHover(true);
          }}
          onDragLeave={(event) => {
          event.preventDefault();
          setZoneHover(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }) => (
            <div
              {...getRootProps()}
              style={Object.assign(
                {},
                styles.zone,
                zoneHover && styles.zoneHover
              )}
            >
              {acceptedFile ? (
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                    onClick={(event) => {
                      getRemoveFileProps().onClick(event);
                      setErrorMessages([]);
                      setRows([]);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              ) : (
                'Haga click o Suelte el archivo CSV para cargarlo.'
              )}
            </div>
          )}
        </CSVReader>
      </Grid>
      <Grid item sx={{ mt: 2, justifyContent: 'center' }}>
        <Button
          variant='contained'
          component='label'
          startIcon={<CloudUpload />}
          style={{ marginTop: '3px' }}
        >
          Subir CSV
        </Button>
      </Grid>
      {errorMessages.length > 0 && (
        <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
          {errorMessages.map((msg, index) => (
            <Alert severity="error" key={index}>
              {msg}
            </Alert>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default CustomCsvUploader;
