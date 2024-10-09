import React from 'react';
import Menu from './components/Menu';
import Tableros from './components/tableros';
import './App.css';

function App() {
  return (
    <div className="App d-flex flex-row">
      <Menu/>
      <Tableros />
    </div>
  );
}

export default App;
