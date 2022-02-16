import React from 'react';
import './App.css';
import Player from './components/Player'

function App() {
  return (
    <div className="Phishjams-main">
      <header className="App-header">
        <h1 className="Phishjams-title">Phishjams Garden</h1>
        <Player />
      </header>
    </div>
  );
}

export default App;
