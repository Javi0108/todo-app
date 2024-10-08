import React from 'react';
import Menu from './components/menu';
import Tablero from './components/tableros';
import './App.css';

function App() {
  return (
    <div className="App d-flex flex-row">
      <Menu/>
      <Tablero />
    </div>
  );
}

export default App;
