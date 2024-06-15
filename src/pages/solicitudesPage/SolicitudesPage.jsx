import React, { useState } from "react";

import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";
import SolicitarAmbienteForm from "../../components/molecules/solicitarAmbienteForm/SolicitarAmbienteForm";
import CustomModal from "../../components/organisms/customModal/CustomModal";
import { useSnackbar } from "../../reservas/organisms/snackbarProvider/SnackbarProvider";
import useTable from "../../hooks/useTable";
import CustomSearchableTable from "../../components/organisms/customSearchableTable/CustomSearchableTable";

const fetchHorariosDisponibles = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(
    `${import.meta.env.VITE_LARAVEL_API_URL}/list/horarios?${query}`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }
  );

  if (!response.ok) throw new Error("Error al obtener la lista de solicitudes");
  const data = await response.json();
  return data;
};

const SolicitudesPage = () => {
  const columns = [
    { id: "fecha", label: "Fecha", sortable: true, filterable: true },
    { id: "ambiente", label: "Ambiente", sortable: true, filterable: true },
    { id: "horario", label: "Horario", sortable: true, filterable: true },
    { id: "capacidad", label: "Capacidad", sortable: true, filterable: true },
    {
      id: "estado",
      label: "Estado",
      sortable: false,
      render: (row) => {
        switch (row.estado) {
          case "disponible":
            return (
              <Chip
                label={row.estado}
                style={{ backgroundColor: green[500], color: "black" }}
              />
            );
          case "solicitado":
            return (
              <Chip
                label={row.estado}
                style={{ backgroundColor: yellow[500], color: "black" }}
              />
            );
          default:
            return (
              <Chip
                label={row.estado}
                style={{ backgroundColor: red[500], color: "black" }}
              />
            );
        }
      },
    },
    {
      id: "acciones",
      label: "Acciones",
      sortable: false,
      render: (row) => (
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenSolicitationForm(row)}
        >
          Solicitar
        </Button>
      ),
    },
  ];

  const { openSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({
    id: 0,
    fecha: "",
    ambiente: "",
    horario: "",
    capacidad: 0,
    estado: "",
  });

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
  } = useTable(fetchHorariosDisponibles, "asc", "fecha");

  const handleOnSubmitSolicitud = async (values) => {
    const [, grupoId] = values.grupo.split("-");

    fetch(`${import.meta.env.VITE_LARAVEL_API_URL}/solicitudesAmbientes`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        horarioDisponibleId: values.id,
        grupoId: grupoId,
        capacidad: values.capacidad,
        tipoReserva: values.tipoReserva,
        docentes: values.docentes,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log("Registrar solicitud ambiente response: ", data);
        openSnackbar("Solicitud registrado exitosamente", "success");
        fetchHorariosDisponibles();
        setOpenModal(false);
      })
      .catch(async (error) => {
        openSnackbar("Error al registrar horario", "error");
      });
  };

  const handleOpenSolicitationForm = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={12} lg={90} sx={{ background: "" }}>
        <Box
          id="solicitudes-ambientes-box"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
            background: "black",
            minHeight: "calc(100vh - 20px)",
          }}
        >
          <Paper
            sx={{
              marginTop: "-5%",
              boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
              padding: "2%",
              width: "100%",
              backgroundColor: "#F3F6F9",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Crear solicitudes ambientes
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginLeft: "5%" }}>
              Buscar horarios ambientes:
            </Typography>
            <CustomSearchableTable
              columns={columns}
              data={data}
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
            <CustomModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              title="Solicitar Ambiente"
            >
              <SolicitarAmbienteForm
                row={selectedRow}
                onClose={() => setOpenModal(false)}
                onSubmit={handleOnSubmitSolicitud}
              />
            </CustomModal>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SolicitudesPage;
