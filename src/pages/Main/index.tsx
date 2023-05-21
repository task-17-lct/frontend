import react from 'react'
import { Button } from '../../elements/Button';
import { FavoriteCard, FavoriteCardIE } from '../../elements/FavoriteCard';
import { GenerateCard } from '../../elements/GenerateCard';
import { RusPassHeader } from '../../elements/Header';
import { TourCard, TourCardIE } from '../../elements/TourCard';
import './style.css'

export const Main: react.FC = () => {
   const TourPropsCard = {
      name: 'Я покажу тебе Москву',
      days: 8,
      imageURL: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      points: [
         {
            title:'Парк Горького',
            description: 'Место',
            icon:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            location:[1,2]
         },
         {
            title:'Отель Москва',
            description: 'Отель',
            icon:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            location:[1,2]
         },
         {
            title:'Ресторан Сказка',
            description: 'Ресторан',
            icon:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            location:[1,2]
         }
      ]
   } as TourCardIE

   const favoriteCardProps = {
      imageURL:'restourant.png',
      title:'Кафе Сказка',
      location:'Казань'
   } as FavoriteCardIE

   return (
      <div className='mainWrapper'>
         <RusPassHeader></RusPassHeader>
         <div className='mainCard'>
            <h2>Рекомендации</h2>
            <div className='cardWrapper'>
               <GenerateCard></GenerateCard>
               <TourCard {...TourPropsCard}></TourCard>
               <TourCard {...TourPropsCard}></TourCard>
               <TourCard {...TourPropsCard}></TourCard>
               <TourCard {...TourPropsCard}></TourCard>
               <TourCard {...TourPropsCard}></TourCard>
            </div>
         </div>
         <div className='mainCard'>
            <h2>Добавьте в избранное</h2>
            <div className='fav-wrapper'>
               <FavoriteCard {...favoriteCardProps}></FavoriteCard>
               <FavoriteCard {...favoriteCardProps}></FavoriteCard>
               <FavoriteCard {...favoriteCardProps}></FavoriteCard>
               <FavoriteCard {...favoriteCardProps}></FavoriteCard>
               <FavoriteCard {...favoriteCardProps}></FavoriteCard>
               <FavoriteCard {...favoriteCardProps}></FavoriteCard>
            </div>
            <div>
               <Button className=''>Посмотреть все</Button>
            </div>
         </div>

         <a href='/'>Документация</a>

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