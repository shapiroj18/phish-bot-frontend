import React from 'react';
import { Player } from './components/Player'

function App() {
  return (
    <div className="bg-medium-dark-magenta h-screen">
      <header>
        <h1 className="text-center font-sans text-2xl font-butler">Phishjams Garden</h1>
        <Player />
      </header>
    </div>
  );
}

export default App;
