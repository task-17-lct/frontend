import react, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend, updateBackend } from '../../consts';

import { RusPassHeader } from '../../elements/Header';
// import './style.css'

import { EventCard } from '../../elements/EventCard';
import { Spin } from 'antd';

export const Favorites: react.FC = () => {
   const [favorites, setFavorites] = useState([])
   let navigate = useNavigate()


   const queried = useRef(false);

   useEffect(()=>{
      updateBackend()

      const dataLoad = async () =>{
         const favorites = await backend.get('user/favorite')
         return {
            favorites
         }
      }

      if (!queried.current && localStorage.getItem('token') != null && localStorage.getItem('firstAuth') != 'true') {
         queried.current = true;
         dataLoad().then((data) => {
             setFavorites(data.favorites.data as any);
         })
      }

      if (null == localStorage.getItem('token')){
         navigate('/login')
      }
   })
     
   return (
      <div className='mainWrapper'>
         <RusPassHeader></RusPassHeader>
        
         <div className='mainCard'>
            <h2>Избранное</h2>
            <div className='fav-wrapper'>
               {
                  favorites.length == 0? <Spin/>
                  :
                  favorites.map((favorite:any, index)=>{
                     return <EventCard category='attraction'
                     description={favorite.description}
                     lat={1}
                     lon={2}
                     oid={favorite.oid}
                     title={favorite.title} ></EventCard>
                  
                  })
               }
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