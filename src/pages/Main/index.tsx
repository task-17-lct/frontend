import { AutoComplete, DatePicker, Input, Checkbox, Select, Radio, Space, Spin } from 'antd';
import react, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend, updateBackend } from '../../consts';
import { Button } from '../../elements/Button';
import { FavoriteCard, FavoriteCardIE } from '../../elements/FavoriteCard';
import { GenerateCard } from '../../elements/GenerateCard';
import { RusPassHeader } from '../../elements/Header';
import { TourCard, TourCardIE } from '../../elements/TourCard';
import './style.css'
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import { Search } from '../../elements/Search';
import { AttractionCard } from '../../elements/AttractionCard';
import { EventCard, EventCardIE } from '../../elements/EventCard';
import { Prefernces } from '../../elements/Prefernces';

export const Main: react.FC = () => {
   const [events, setEvents] = useState([])
   const [favorites, setFavorites] = useState([])
   let navigate = useNavigate()

   let token = localStorage.getItem('token')
   let firstAuth = localStorage.getItem('firstAuth')
   console.log(token)

   const queried = useRef(false);

   useEffect(()=>{
      updateBackend()

      const dataLoad = async () =>{
         const favorites = await backend.get('user/favorite')
         const events = await backend.get('recommendations/recommendations/')
         return {
            favorites, events
         }
      }

      if (!queried.current && localStorage.getItem('token') != null && localStorage.getItem('firstAuth') != 'true') {
         queried.current = true;
         dataLoad().then((data) => {
             setFavorites(data.favorites.data as any);
             setEvents(data.events.data as any);
         })
      }

      if (null == localStorage.getItem('token')){
         navigate('/login')
      }

      // if (favorites.length == 0){
      //    backend.get('user/favorite').then((e)=>setFavorites(e.data))
      // }
      // if (events.length == 0){
      //    backend.get('recommendations/recommendations/').then((e)=>setEvents(e.data as any));
      // }
   })
     
   return (
      <div className='mainWrapper'>
         {
            firstAuth == 'true'? <Prefernces></Prefernces>:null
         }
         <RusPassHeader></RusPassHeader>
         <div className='headMainWrapper'>
            <div className='backgroundMainIMG'>
               <div className='imgHeader'>Сгенерируйте ваш идеальный тур</div>
               <div className='imgDescr'>Туры, достопримечательности, отели  - все в одном cервисе</div>
            </div>
            <Search onSearch={()=>null}></Search>
         </div>
         <div className='mainCard'>
            <h2>Рекомендации</h2>
            
            <div className='cardWrapper'>
               <GenerateCard></GenerateCard>
               {
                  events.length == 0? <Spin/>
                  :
                  events.map((category:any)=>{
                     category = category.events.map((event:any)=>{
                        return <EventCard category={category.category} {...event}></EventCard>
                     })
                     return category
                  })
               
               }

            </div>
         </div>
         <div className='mainCard'>
            <h2>Избранное</h2>
            <div className='fav-wrapper'>
               {
                  favorites.length == 0? <Spin/>
                  :
                  favorites.map((favorite:any, index)=>{
                     if (index < 10){
                     return <EventCard category='attraction'
                     description={favorite.description}
                     lat={1}
                     lon={2}
                     oid={favorite.oid}
                     title={favorite.title} ></EventCard>
                  }
                  else{
                     return null
                  }
                  })
               
               }
            </div>
            <div>
               <Button onClick={()=>navigate('/favorites')} className=''>Посмотреть все</Button>
            </div>
         </div>

         <a href='https://1drv.ms/w/s!AuaFmGWFNV5Np0OhMmVtxPXlG2Ob?e=f7NDCp'>Документация</a>

         <div className='mainIconWrapper'>
            <img className='mainIcon' src='icons/yt.svg'></img>
            <img className='mainIcon' src='icons/vk.svg'></img>
            <img className='mainIcon' src='icons/dz.svg'></img>
            <img className='mainIcon' src='icons/tg.svg'></img>
            <img className='mainIcon' src='icons/ok.svg'></img>
         </div>

         <div className='grey'>© 2023 A project of the Government of Moscow</div>
      </div>

   );
}