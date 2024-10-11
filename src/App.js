import React, {useState} from 'react';
import Listas from './components/listas';
import Tableros from './components/tableros';
import './App.css';

function App() {
  const [tableroSeleccionadoId, setTableroSeleccionadoId] = useState(null);

  const handleTableroSelect = (id) => {
    setTableroSeleccionadoId(id); // Actualizar el estado del tablero seleccionado
  };

  return (
    <div className="App d-flex flex-row">
      <Tableros onSelectTablero={handleTableroSelect}/>
      {tableroSeleccionadoId && <Listas id={tableroSeleccionadoId} />}
    </div>
  );
}

export default App;
