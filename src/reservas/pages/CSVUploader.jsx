import React from 'react';
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
} from '@mui/material';
import { FolderOpen,CloudUpload } from '@mui/icons-material';
import CSVReader from 'react-csv-reader';

class CSVUploader extends React.Component {
  state = {
    csvData: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleCSVUpload = (data, fileInfo) => {
    if (fileInfo.type !== 'text/csv') {
      this.setState({ error: '(*) El archivo no cumple con el formato CSV' });
      return;
    }
    // Procesar los datos CSV
    const csvData = data.slice(1); // Excluir la primera fila (títulos)
    this.setState({ csvData, error: null});
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  render() {
      const { csvData, page, rowsPerPage, error } = this.state;

    return (
      <Paper sx={{
            marginTop: '-5%',
            boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)', // Ajusta el sombreado para el marco
            padding: '8%',
            width: '100%',
            maxWidth: 'auto',
            backgroundColor: '#F3F6F9', // Cambia el color de fondo al interior del marco
          }}>

          
        <div>
          <h2 style={{textAlign: 'center'}}>Carga Masiva de Datos CSV</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <Button
              variant="contained"
              // component="label"
              startIcon={<FolderOpen />} // Usa el icono de FolderOpen
              // style={{ marginTop: '20px' }}
            >
              {/* Seleccionar Archivo */}
              <CSVReader
                cssClass="csv-reader-input"
                // label="Selecciona un archivo CSV :"
                onFileLoaded={this.handleCSVUpload}
                parserOptions={{
                  delimiter: ',',
                  skipEmptyLines: true
                }}
                // inputStyle={{ display: 'none' }} // Ocultar el input generado por CSVReader
              />
          </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          {error && (
              <span style={{ position: 'absolute', top: '30%', right: '5%', transform: 'translateY(-50%)', color: 'red', fontSize: '0.8em', fontWeight: 'bold' }}>
                {error}
              </span>
            )}
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUpload />}
              style={{ marginTop: '3px' }}
            >
              Subir CSV
              <input
                type="file"
                style={{ display: 'none' }}
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                  };
                  this.handleCSVUpload(null, fileInfo);
                }}
              />
            </Button>
            
          </div>
          <Paper style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Uno</TableCell>
                  <TableCell>Dos</TableCell>
                  <TableCell>Tres</TableCell>
                  <TableCell>Cuatro</TableCell>
                  <TableCell>Cinco</TableCell>
                  <TableCell>Seis</TableCell>
                  <TableCell>Siete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={csvData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:" 
            />
          </Paper>
        </div>
      </Paper>
    );
  }
  
}

export default CSVUploader;
