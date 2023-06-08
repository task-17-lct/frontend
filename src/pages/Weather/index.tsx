import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backend } from "../../consts";
import { Button } from "../../elements/Button";
import { RusPassHeader } from "../../elements/Header";
import { RouteCard } from "../../elements/RouteCard";
import { RouteChangeCard } from "../../elements/RouteChangeCard";
import './styles.css'
export const Weather:React.FC = () =>{
    let {routeChangeId} = useParams()
    const [weather, setWeather] = useState<any>()

    useEffect(()=>{
        if (weather == undefined){
            backend.get('weather/' + routeChangeId + '/').then((e)=>setWeather(e.data))
        }
    })

    let prev_route;
    let predicted_route;
    console.log(weather )
    if (weather != undefined){

            let newPath = weather.prev_route.points.map((path:any)=>{
                let newPaths = path.paths
                for (let i = 0; i < newPaths.length; i++) { 
                    if (newPaths[i].type == 'transition') { 
                      newPaths.splice(i, 1); 
                      i--; 
                    }
                }

                return {
                    date:path.date,
                    paths: newPaths
                }
            })


            prev_route =  {
                city: 'Старый маршрут',
                path: newPath
            }

            let newPredictPath = weather.predicted_route.points.map((path:any)=>{
                let newPaths = path.paths
                for (let i = 0; i < newPaths.length; i++) { 
                    if (newPaths[i].type == 'transition') { 
                      newPaths.splice(i, 1); 
                      i--; 
                    }
                }

                return {
                    date:path.date,
                    paths: newPaths
                }
            })

            predicted_route = {
                city: 'Предлагаемый маршрут',
                path: newPredictPath
            }
        
    }
    return <div className="mainWrapper">
            <RusPassHeader></RusPassHeader>


            {
    prev_route == undefined || predicted_route == undefined?
    
            <Spin />:
            <div className='mainCard'>
            <h2>Измените маршрут из-за погоды!</h2>

            <div className='cardWrapper'>
                    <RouteChangeCard city={predicted_route.city} rawProps={weather.predicted_route} options={predicted_route.path}></RouteChangeCard>
                    <RouteChangeCard city={prev_route.city} rawProps={weather.prev_route} options={prev_route.path}></RouteChangeCard>
            </div>
            <div className="changeBtnWrapper">
                <Button className="changeYBtn">Согласится</Button>
                <Button className="changeBtn">Отказаться</Button>

            </div>
</div>
}



        <a href='https://1drv.ms/w/s!AuaFmGWFNV5Np0OhMmVtxPXlG2Ob?e=f7NDCp'>Документация</a>

        <div className='mainIconWrapper'>
            <img className='mainIcon' src='/icons/yt.svg'></img>
            <img className='mainIcon' src='/icons/vk.svg'></img>
            <img className='mainIcon' src='/icons/dz.svg'></img>
            <img className='mainIcon' src='/icons/tg.svg'></img>
            <img className='mainIcon' src='/icons/ok.svg'></img>
        </div>

        <div className='grey'>© 2023 A project of the Government of Moscow</div>
    </div>
}