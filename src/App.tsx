import React from 'react';
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'


import { MyMap } from './сomponents/map';
import 'mapbox-gl/dist/mapbox-gl.css';

configureRootTheme({ theme })

function App() {
  return (
    <div className="App">
      <MyMap></MyMap>
    </div>
  );
}

export default App;
