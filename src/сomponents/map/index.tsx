import React, { useEffect, useState } from "react";
import Map, {Source, Layer} from 'react-map-gl';
import axios from 'axios'
import { Checkbox } from '@yandex/ui/Checkbox/desktop/bundle'
import path from "path";
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'
configureRootTheme({ theme })

export const MyMap: React.FC = () =>{

    const [route, setRoute] = useState({})
    const [points, setPoints] = useState({})
    const [path, setPath] = useState('30.197141%2C59.997082%3B30.209432%2C60.004412')
    const [checked, setChecked] = useState(new Array<Boolean>())
    useEffect(()=>{
        axios.get('https://api.mapbox.com/directions/v5/mapbox/walking/'+path+'?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q').then(
            (data:any) => setRoute(data.data.routes[0].geometry)
        )
    })
    const onCheckChange = (e:any, cords:Array<string>, ind:number) => {
        console.log(e)
        if (e.target.checked){

            if (path == ''){
                setPath(cords[0] + '%2C' + cords[1])
            }else{
                setPath(path + "%3B" + cords[0]+'%2C' + cords[1])
            }
            axios.get('https://api.mapbox.com/directions/v5/mapbox/walking/'+path+'?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q').then(
                (data:any) => setRoute(data.data.routes[0].geometry)
            )
            checked[ind] = true
            setChecked(checked)
        }else{
            setPath(path.replace("%3B" + cords[0]+'%2C' + cords[1], ''))

            axios.get('https://api.mapbox.com/directions/v5/mapbox/walking/'+path+'?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q').then(
                (data:any) => setRoute({
                    type: 'Feature',
                    properties: {},
                    geometry: data.data.routes[0].geometry
                })
            )
            checked[ind] = false
            setChecked(checked)
        }
    };

    const geojson = {
        type: 'FeatureCollection',
        features: [
          {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
        ]
      };
    

    const layerWayStyle ={
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: route
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
    }
    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf'
        }
      };
      
    const [viewport, setViewport] = React.useState();

    return (
    <div>
        <div>
            <Checkbox size='m' view='default' checked={true} onChange={(e:any)=>onCheckChange(e, ['30.197141','59.997082'],7)} label='30.197141,59.997082'></Checkbox>
            <Checkbox size='m' view='default' checked={true} onChange={(e:any)=>onCheckChange(e, ['30.209432','60.004412'], 8)} label = '30.209432,60.004412'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[0]} onChange={(e:any)=>onCheckChange(e, ['30.215966','60.004645'], 0)} label='30.215966,60.004645'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[1]} onChange={(e:any)=>onCheckChange(e, ['30.231952','60.005933'], 1)} label='30.231952,60.005933'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[2]} onChange={(e:any)=>onCheckChange(e, ['30.265898','60.012630'], 2)} label='30.265898,60.012630'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[3]} onChange={(e:any)=>onCheckChange(e, ['30.295340','60.018610'], 3)} label='30.295340,60.018610'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[4]} onChange={(e:any)=>onCheckChange(e, ['30.329311','60.033712'], 4)} label='30.329311,60.033712'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[5]} onChange={(e:any)=>onCheckChange(e, ['30.416310','60.042787'], 5)} label='30.416310,60.042787'></Checkbox>
            <Checkbox size='m' view='default' checked={checked[6]} onChange={(e:any)=>onCheckChange(e, ['30.288291','59.994208'], 6)} label='30.288291,59.994208'></Checkbox>
        </div>

        <Map initialViewState={{
            longitude: 30.197141,
            latitude: 59.997082,
            zoom: 14
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken='pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q'
        >
        <Source id="my-data" type="geojson" data={geojson as any}>
          <Layer {...layerStyle as any} />
        </Source>
        <Source id="way-data" type="geojson" data={route as any}>
          <Layer {...layerWayStyle as any} />
        </Source>
      </Map>
    </div>
      
    );
}
