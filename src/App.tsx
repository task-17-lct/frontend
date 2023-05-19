import React from 'react';
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'


configureRootTheme({ theme })
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
