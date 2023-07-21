import React from 'react';
import './App.css';

import TrainTable from './components/TrainTable';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">

      </header>
      <div className="train-table-container">
        <TrainTable />
      </div>
    </div>
  );
}

export default App;