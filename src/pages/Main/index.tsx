import { AutoComplete, DatePicker, Input, Checkbox, Select } from 'antd';
import react, { useEffect, useState } from 'react'
import { backend } from '../../consts';
import { Button } from '../../elements/Button';
import { FavoriteCard, FavoriteCardIE } from '../../elements/FavoriteCard';
import { GenerateCard } from '../../elements/GenerateCard';
import { RusPassHeader } from '../../elements/Header';
import { TourCard, TourCardIE } from '../../elements/TourCard';
import './style.css'

export const Main: react.FC = () => {
   const { RangePicker } = DatePicker;
   const [cities, setCities] = useState([])

   useEffect(()=>{
      if (cities.length == 0){
          backend.get('/data/cities').then((response)=>setCities(response.data))
      }
  })


   const TourPropsCard = {
      name: 'Я покажу тебе Москву',
      days: 8,
      id:'23343',
      mapPoints: [[-71.0703,42.3419],[-71.0688, 42.3393],[-71.0728, 42.3348]],
      imageURL: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      points: [
         {
            title:'Парк Горького',
            description: 'Место',
            icon:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
            location:[1,2],

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

   const [dates, setDates] = useState()

   const options = [
      {
        label: 'Подсказка 1',
        options: 'Подсказка 1',
      },
      {
         label: 'Подсказка 2',
         options: 'Подсказка 2',
      },
      {
         label: 'Подсказка 3',
         options: 'Подсказка 3',
      },
    ];

   const [toolsOpened, setToolsOpened] = useState(false)

   
   return (
      <div className='mainWrapper'>
         <RusPassHeader></RusPassHeader>
         <div className='headMainWrapper'>
            <img  className='backgroundIMG' src='background.png'></img>
            <div style={{width:'75%'}}>
               <div style={{borderRadius: toolsOpened? '20px 20px 0px 0px':'20px'}} className='toolsMainWrapper'>
                  <div className='rowWrapper' onClick={()=>setToolsOpened(!toolsOpened)}>
                     <img src='filter.svg'></img>
                     <div>Фильтры</div>
                  </div>
                  <img src='react.svg'></img>
                  <Select
                     className='antdBorder'
                     showSearch
                     placeholder="Выберите направление"
                     optionFilterProp="children"
                     // onChange={onChange}
                     // onSearch={onSearch}
                     filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                     }
                     options={cities.map((city:any)=>{
                        return {
                        value:city.oid,
                        label: city.title
                     }
                     }
                     )}
                  />

                  <img src='react.svg'></img>
                  <RangePicker
                              onChange={(e)=>setDates(e as any)}
                  ></RangePicker>
                  <img src='react.svg'></img>
                  <Button className='btn-y'>Сгенерировать</Button>
               </div>
               {
                  toolsOpened? <div className='searchOpened'>
                        <div className='questionWrapper'>
                           <h2>Как добраться</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>Самолет</Checkbox>
                              <Checkbox>ЖД</Checkbox>
                              <Checkbox>Автобус</Checkbox>
                              <Checkbox>Смешанный</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Где остановимся</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>Отель</Checkbox>
                              <Checkbox>Хостел</Checkbox>
                              <Checkbox>Апартаменты</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Как перемещаться на месте</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>Машина</Checkbox>
                              <Checkbox>Общественный транспорт</Checkbox>
                              <Checkbox>Пешком</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Что посмотреть</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>Музеи и выставки</Checkbox>
                              <Checkbox>Мероприятия и места</Checkbox>
                              <Checkbox>Обзорные экскурсии</Checkbox>
                              <Checkbox>Культурное наследие</Checkbox>
                              <Checkbox>Парки и прогулки</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Где питаться</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>Рестораны</Checkbox>
                              <Checkbox>Кафе</Checkbox>
                              <Checkbox>Бары</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Дополнительно</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>С детьми</Checkbox>
                              <Checkbox>С животными</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Рейтинг</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>5*</Checkbox>
                              <Checkbox>4*</Checkbox>
                              <Checkbox>3*</Checkbox>
                              <Checkbox>2*</Checkbox>
                              <Checkbox>1*</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Рейтинг</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox>5*</Checkbox>
                              <Checkbox>4*</Checkbox>
                              <Checkbox>3*</Checkbox>
                              <Checkbox>2*</Checkbox>
                              <Checkbox>1*</Checkbox>
                           </div>
                        </div>
                  </div>:null
               }
            </div>
            
         </div>
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