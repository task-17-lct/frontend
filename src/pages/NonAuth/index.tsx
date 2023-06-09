import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RouteCard, RouteCardIE } from "../../elements/RouteCard";
import { Search } from "../../elements/Search";
import { Spin } from "antd";
import axios from "axios";
import { NonAuthSearch } from "../../elements/NonAuthSearch";
import { Button } from "../../elements/Button";
import { EventCard } from "../../elements/EventCard";
import { BASE_URL, nonAuthToken } from "../../consts";


let backend = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
    headers: {'Authorization': 'Bearer ' + nonAuthToken}
  }
)

export const NonAuth:React.FC = () =>{
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

    let navigate = useNavigate()
    return(
        <div className="mainWrapper">
           
            <h1>Зарегистрируйтесь или войдите, чтобы использовать весь функционал</h1>
            <div className="changeBtnWrapper">
                <Button onClick={()=>navigate('/register')} className="changeYBtn">Зарегистрироваться</Button>
                <Button onClick={()=>navigate('/login')} className='changeBtn'>Войти</Button>
            </div>

            <NonAuthSearch onSearch={()=>onSearch()}></NonAuthSearch>
            {
                data.length == 0 || newData == undefined?
                
                <Spin />:
                <div className='mainCard'>
                <h2>Предлагаемые туры</h2>

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