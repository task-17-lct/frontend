import React, { useEffect, useState } from "react";
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
    const [cities, setCities] = useState([])

    const [data, setData] = useState([])
    const [events, setEvents] = useState([])
    useEffect(()=>{
        if (cities.length == 0){
            backend.get('/data/cities').then((response)=>setCities(response.data))
            backend.post('/route/build',JSON.parse(prefs as string)).then((r)=>setData(r.data as any))
            backend.post('/recommendations/build_events/',JSON.parse(prefs as string)).then((r)=>setEvents(r.data as any))
        }
    })

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
    const contentStyle: React.CSSProperties = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
 
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

                    <a href='/'>Документация</a>

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