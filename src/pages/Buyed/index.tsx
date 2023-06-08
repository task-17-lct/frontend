import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { backend } from "../../consts";
import { RusPassHeader } from "../../elements/Header";
import { RouteCard } from "../../elements/RouteCard";

export const Buyed:React.FC = () =>{
    const [data, setData] = useState([])
    
    useEffect(()=>{
        backend.get('/buy/').then((e)=>setData(e.data))
    })
    let newData;
    
    if (data.length != 0){
        newData = data.map((tour:any, index)=>{

            let newPath = tour.points.map((path:any)=>{
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
                city: 'Тур №' + (index+1),
                path: newPath
            }
        })
    }

    

    
    
    



 
    return(
        <div className="mainWrapper">
            <RusPassHeader></RusPassHeader>
           
            <h1>Ваши купленные туры</h1>

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
