import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { backend } from "../../consts";
import { RouteCard, RouteCardIE } from "../../elements/RouteCard";
import { RusPassHeader } from "../../elements/Header";
import './style.css'
import { Search } from "../../elements/Search";
import { Spin } from "antd";
import { EventCard } from "../../elements/EventCard";


export const SearchPage:React.FC = () =>{
    let { prefs } = useParams();

    const [data, setData] = useState([])
    const [events, setEvents] = useState([])

    const queried = useRef(false);
    useEffect(()=>{

        const dataLoad = async (prefs: string) => {
            const routes = await backend.post('/route/build',JSON.parse(prefs as string))
            const events = await backend.post('/recommendations/build_events/',JSON.parse(prefs as string))
            return {
              routes, events
            }
        }
        if (!queried.current) {
            queried.current = true;
            dataLoad(prefs as string).then((data) => {
                setData(data.routes.data as any);
                setEvents(data.events.data as any);
            })
        }
    }, [prefs])
    console.log(events)

    let newData;
    
    if (data.length != 0){
        newData = data.map((tour:any)=>{

            let newPath = tour.path.map((path:any)=>{
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


            return {
                city: tour.city,
                path: newPath
            }
        })
    }

    

    
    
    

    const onSearch = () =>{
        setData([])
    }

 
    return(
        <div className="mainWrapper">
            <RusPassHeader></RusPassHeader>
           
            <h1>Посмотрите, что мы нашли по вашему запросу</h1>
            <Search onSearch={()=>onSearch()}></Search>
            {
                data.length == 0 || newData == undefined?
                
                <Spin />:
                <div className='mainCard'>
                <h2>Рекомендованные Туры</h2>

                <div className='cardWrapper'>
                    {
                        newData.map((tour:any, index:number)=>
                            <RouteCard city={tour.city} rawProps={data[index]} options={tour.path}></RouteCard>
                        )
                    }

                </div>
            </div>
            }

            {   
                  events.length == 0? <Spin/>
                  :
                    <div className='mainCard'>
                    <h2>Рекомендованные меропрития</h2>
                    <div className='cardWrapper'>{
                        events.map((event:any)=>{
                            return <EventCard category={'viewpoint'} {...event}></EventCard>
                        })
                    }
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
    );
}