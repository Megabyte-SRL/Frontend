import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import useTable from '../../hooks/useTable';
import CustomSearchableTable from '../../components/organisms/customSearchableTable/CustomSearchableTable';
import { blue, green, orange, red, yellow } from '@mui/material/colors';

const obtenerEstado = (estado) => {
  switch (estado) {
    case 'reservado':
      return <Chip
        label={estado}
        style={{ backgroundColor: green[500], color: 'black' }}
      />
    case 'solicitado':
      return <Chip
        label={estado}
        style={{ backgroundColor: yellow[500], color: 'black' }}
      />
    case 'sugerido':
      return <Chip
        label={estado}
        style={{ backgroundColor: orange[500], color: 'black' }}
      />
    case 'aceptado':
      return <Chip
        label={estado}
        style={{ backgroundColor: blue[500], color: 'black' }}
      />
    default:
      return <Chip
        label={estado}
        style={{ backgroundColor: red[500], color: 'black' }}
      />
  }
}; 

const fetchStatusChanges = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/list/solicitudStatusChanges?${query}`, {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    }
  });

  if (!response.ok) throw new Error('Error al obtener la lista de cambios de estado');
  const data = await response.json();
  return data;
};

const RegistroSolicitudesPage = () => {
  const columns = [
    { id: 'fecha', label: 'Fecha', sortable: true, filterable: true },
    { id: 'fechaSolicitud', label: 'Fecha solicitud', sortable: true, filterable: true },
    { id: 'ambiente', label: 'Ambiente', sortable: true, filterable: true },
    { id: 'horario', label: 'Horario', sortable: true, filterable: true },
    { id: 'capacidadAmbiente', label: 'Capacidad ambiente', sortable: true, filterable: true },
    { id: 'capacidadReserva', label: 'Capacidad reserva', sortable: true, filterable: true },
    {
      id: 'estadoAntiguo',
      label: 'Estado Anterior',
      sortable: true, filterable: true,
      render: (row) => obtenerEstado(row.estadoAntiguo),
    },
    {
      id: 'estadoNuevo',
      label: 'Estado Nuevo',
      sortable: true, filterable: true,
      render: (row) => obtenerEstado(row.estadoNuevo),
    },
  ];

  const {
    data,
    searchText,
    handleSearchChange,
    filters,
    handleFilterChange,
    order,
    orderBy,
    handleSort,
    rowsPerPage,
    page,
    handlePageChange,
    handleRowsPerPageChange,
    totalRows,
    loading,
  } = useTable(fetchStatusChanges, 'asc', 'fecha');

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={12} lg={12} sx={{ background: '' }}>
        <Box
          id='verificar-solicitudes-box'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10%',
            background: 'black',
            minHeight: 'calc(100vh - 20px)',
          }}
        >
          <Paper
            sx={{
              marginTop: '-5%',
              boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
              padding: '2%',
              width: '100%',
              backgroundColor: '#F3F6F9',
            }}
          >
            <Typography variant='h4' align='center' gutterBottom>
              Registro de cambios de estado
            </Typography>

            <CustomSearchableTable
              columns={columns}
              data={data.map(
                statusChange => ({
                  id: statusChange.id,
                  fecha: statusChange.solicitud_ambiente.horario_disponible.fecha,
                  fechaSolicitud: statusChange.solicitud_ambiente.fechaSolicitud,
                  ambiente: statusChange.solicitud_ambiente.horario_disponible.ambiente.nombre,
                  horario: `${statusChange.solicitud_ambiente.horario_disponible.hora_inicio} - ${statusChange.solicitud_ambiente.horario_disponible.hora_fin}`,
                  capacidadAmbiente: statusChange.solicitud_ambiente.horario_disponible.capacidad,
                  capacidadReserva: statusChange.solicitud_ambiente.capacidad,
                  estadoAntiguo: statusChange.estado_antiguo,
                  estadoNuevo: statusChange.estado_nuevo
                })
              )}
              order={order}
              orderBy={orderBy}
              onSort={handleSort}
              page={page}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onFilterChange={handleFilterChange}
              searchText={searchText}
              onSearchChange={handleSearchChange}
              onClickRow={(row) => console.log(row)}
              loading={loading}
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegistroSolicitudesPage;
