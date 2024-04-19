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
import { CloudUpload } from '@mui/icons-material';
import CSVReader from 'react-csv-reader';

class CSVUploader extends React.Component {
  state = {
    csvData: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleCSVUpload = (data, fileInfo) => {
    if (fileInfo.type !== 'text/csv') {
      alert('Error: El archivo debe ser un CSV.');
      return;
    }
    // Procesar los datos CSV
    const csvData = data.slice(1); // Excluir la primera fila (títulos)
    this.setState({ csvData });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  render() {
    const { csvData, page, rowsPerPage } = this.state;

    return (
      <div>
        <h2>Carga Masiva de Datos CSV</h2>
        <CSVReader
          cssClass="csv-reader-input"
          label="Selecciona un archivo CSV:"
          onFileLoaded={this.handleCSVUpload}
          parserOptions={{
            delimiter: ',',
            skipEmptyLines: true
          }}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
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
          />
        </Paper>
      </div>
    );
  }
}

export default CSVUploader;
