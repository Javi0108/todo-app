import React, {useState} from 'react';
import Menu from './components/Menu';
import Tableros from './components/tableros';
import './App.css';

function App() {
  const [tableroSeleccionadoId, setTableroSeleccionadoId] = useState(null);

  const handleTableroSelect = (id) => {
    setTableroSeleccionadoId(id); // Actualizar el estado del tablero seleccionado
  };

  return (
    <div className="App d-flex flex-row">
      <Menu onSelectTablero={handleTableroSelect}/>
      {tableroSeleccionadoId && <Tableros id={tableroSeleccionadoId} />}
    </div>
  );
}

export default App;
