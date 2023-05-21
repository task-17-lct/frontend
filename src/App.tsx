import React from 'react';
import { Register } from './pages/Register';
import { MyMap } from './сomponents/map';
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  return (
    <div className="App">
      <MyMap></MyMap>
    </div>
  );
}

export default App;
