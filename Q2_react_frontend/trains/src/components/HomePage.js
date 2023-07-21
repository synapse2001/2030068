import React, { useState, useEffect } from 'react';
import { CircularProgress, IconButton, styled, createTheme, ThemeProvider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
    },
    action: {
      active: '#ffffff',
    },
    background: {
      default: '#424242',
      paper: '#424242',
    },
    grey: {
      800: '#424242',
    },
    button_color: {
      main: '#3F51B5',
    },
    edit_color: {
      main: '#388E3C',
    },
  },
});


const StyledTableContainer = styled('div')({
  width: '100%',
  height: 'calc(100vh - 200px)',
  backgroundColor: theme.palette.grey[800],
});

const Homepage = ({ trains, isLoading, onRefresh }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredTrains, setFilteredTrains] = useState([]);

  useEffect(() => {
    setFilteredTrains(trains);
  }, [trains]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const generateRowId = (row) => {
    return `${row.trainNumber}-${row.trainName}`;
  };

 
  return (
    <ThemeProvider theme={theme}>
      <div>
        <StyledTableContainer>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </div>
          ) : (
            <DataGrid
              rows={filteredTrains}
              columns={[
                { field: 'trainNumber', headerName: 'Train Number', width: 150 },
                { field: 'trainName', headerName: 'Train Name', width: 200 },
                { field: 'departureTime', headerName: 'Departure Time', width: 180, valueGetter: (params) => `${params.row.departureTime.Hours}:${params.row.departureTime.Minutes}:${params.row.departureTime.Seconds}` },
                { field: 'seatsAvailable_sleeper', headerName: 'Sleeper Seats', width: 160, valueGetter: (params) => params.row.seatsAvailable.sleeper },
                { field: 'seatsAvailable_AC', headerName: 'AC Seats', width: 120, valueGetter: (params) => params.row.seatsAvailable.AC },
                { field: 'price_sleeper', headerName: 'Sleeper Price', width: 150, valueGetter: (params) => params.row.price.sleeper },
                { field: 'price_AC', headerName: 'AC Price', width: 120, valueGetter: (params) => params.row.price.AC },
                { field: 'delayedBy', headerName: 'Delayed By', width: 120 },
              ]}
              loading={isLoading}
              getRowId={generateRowId}
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection
            />
          )}
        </StyledTableContainer>
      </div>
    </ThemeProvider>
  );
};

export default Homepage;
