import React, { Component } from 'react';
import { Box, Tab, Tabs, ThemeProvider, createTheme, IconButton, TextField, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import Homepage from './HomePage';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    primary: { main: '#ffffff' },
    grey,
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: ['Arial', 'sans-serif'].join(','),
    body1: {
      background: 'none',
      color: '#a4a6a5',
    },
  },
});

class TrainTable extends Component {
  state = {
    selectedTab: 0,
    trains: [],
    isLoading: true,
    searchField: '',
    searchResults: [],
    isSearchOpen: false,
  };

  componentDidMount() {
    this.fetchTrains();
  }

  fetchTrains = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trains/');
      const data = response.data;
      function bubbleSort(arr, key, sortOrder) {
        console.log("I am Called")
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < len - 1 - i; j++) {
            if (
              (sortOrder === 'asc' && arr[j][key] > arr[j + 1][key]) ||
              (sortOrder === 'desc' && arr[j][key] < arr[j + 1][key])
            ) {
              const temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
            }
          }
        }
      }
      bubbleSort(data, 'price.AC', 'asc'); // Sort by price in ascending order
      bubbleSort(data, 'seatsAvailable.AC', 'desc'); // Sort by seatsAvailable in descending order
      bubbleSort(data, 'departureTime', 'desc'); // Sort by departureTime in descending order
      const sortedTrainsData = data;
      console.log(sortedTrainsData);
      this.setState({ trains: sortedTrainsData, isLoading: false });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleSearchFieldChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleSearch = () => {
    const { trains, searchField } = this.state;
    const searchResults = trains.filter((train) => {
      return train.trainNumber === searchField;
    });
    this.setState({ searchResults, selectedTab: 1 });
  };


  render() {
    const { selectedTab, trains, isLoading, searchField, searchResults } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: grey[800],
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id="searchField"
                label="Search by Train Number"
                variant="outlined"
                value={searchField}
                onChange={this.handleSearchFieldChange}
                sx={{
                  mr: 1,
                  color: '#ffffff',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },
                }}
              />
              <IconButton color="primary" aria-label="search" onClick={this.handleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>

          <Tabs
            value={selectedTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Homepage" sx={{ color: '#d6d6d6' }} />
            <Tab label="Search Result" sx={{ color: '#d6d6d6' }} />
          </Tabs>

          <Box sx={{ p: 2, flex: 1 }}>
            {selectedTab === 0 && <Homepage trains={trains} isLoading={isLoading} onRefresh={this.fetchTrains} />}
            {selectedTab === 1 && <Homepage trains={searchResults} isLoading={isLoading} onRefresh={this.fetchTrains} />}
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default TrainTable;
