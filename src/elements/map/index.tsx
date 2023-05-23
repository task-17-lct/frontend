import React, { useEffect, useState } from "react";
import Map, {Source, Layer} from 'react-map-gl';
import axios from 'axios'
import { Checkbox } from '@yandex/ui/Checkbox/desktop/bundle'
import path from "path";
import { configureRootTheme } from '@yandex/ui/Theme'
import { theme } from '@yandex/ui/Theme/presets/default'
configureRootTheme({ theme })

export interface MapIE{
  points: number[][]

}

export const MyMap: React.FC<MapIE> = (props) =>{
  console.log(props.points)

    let pathString = ''
    let firstChecked = new Array<Boolean>()
    props.points.forEach((point, index) => {
      firstChecked.push(true)
      pathString = pathString + point[0] + ',' + point[1] + (index == (props.points.length-1)? '':';')
    });
    
    const [route, setRoute] = useState()
    const [path, setPath] = useState(pathString)
    const [checked, setChecked] = useState(firstChecked)
  

    useEffect(()=>{
      if (route == undefined){
        axios.get('https://api.mapbox.com/directions/v5/mapbox/driving/'+path+'?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiZmlyZXNpZWh0IiwiYSI6ImNrdW9kemYzbTB4ZGkycHAxbXN2YnIzaGMifQ.G0fl-qVbecucfOvn8OtU4Q').then(
            (data:any) => setRoute(data.data.routes[0].geometry)
        )
      }
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
                } as any)
            )
            checked[ind] = false
            setChecked(checked)
        }
    };

    const geojson = {
        type: 'FeatureCollection',
        features: props.points.map((point, index)=>{ 
            return {type: 'Feature', geometry: {type: 'Point', coordinates: point}}
          }
        )
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
      

    return (
    <div>
        <div>
          {
            props.points.map((value, index)=>
              <Checkbox 
                size='m' 
                view='default'
                checked={checked[index]}
                onChange={(e:any)=>onCheckChange(e, [value[0].toString(), value[1].toString()],index)} 
                label={value[0].toString()+", "+value[1].toString()
              }></Checkbox>
            )
          }
        </div>

        <Map initialViewState={{
            longitude: props.points[0][0],
            latitude: props.points[0][1],
            zoom: 14
        }}
        style={{width: '100%', height: '40vh'}}
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
