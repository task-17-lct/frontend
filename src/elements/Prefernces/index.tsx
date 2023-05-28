import React, { useEffect, useState } from "react";
import { Carousel, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Button } from "../Button";
import './style.css'
import { ChoiceIcon, ChoiceIconIE } from "../ChoiceIcon";
import { syncBuiltinESMExports } from "module";
import axios from "axios";
import { backend } from "../../consts";
import { HotelCard, HotelCardIE } from "../HotelCard";
import { AttractionCard, AttractionCardIE } from "../AttractionCard";
export const Prefernces = () =>{
    const [activeTab, setActiveTab] = useState(1)
    const [cities, setCities] = useState([])
    const [regions, setRegions] = useState([])
    const [hotels, setHotels] = useState([])
    const [events, setEvents] = useState([])

    useEffect(()=>{
        if (cities.length == 0){
            backend.get('/data/cities').then((response)=>setCities(response.data))
            backend.get('/data/regions').then((response)=>setRegions(response.data))
        }
    })
   

    const transportOptions = {
            options:[
                {
                    name: 'Автобус',
                    icon: 'icons/bus.svg',
                    key: 'bus'
                },
                {
                    name: 'Машина',
                    icon: 'icons/car.svg',
                    key: 'car'
                },
                {
                    name: 'Самолет',
                    icon: 'icons/plane.svg',
                    key: 'plane'
                },
                {
                    name: 'Поезд',
                    icon: 'icons/train.svg',
                    key: 'train'
                }
            ],
            onChange: (e)=>console.log(e)
        } as ChoiceIconIE


        const transportCityOptions = {
            options:[
                {
                    name: 'Транспорт',
                    icon: 'icons/bus.svg',
                    key: 'bus'
                },
                {
                    name: 'Машина',
                    icon: 'icons/car.svg',
                    key: 'car'
                },
                {
                    name: 'Велосипед',
                    icon: 'icons/bycicle.svg',
                    key: 'bycicle'
                },
                {
                    name: 'Самокат',
                    icon: 'icons/scooter.svg',
                    key: 'scooter'
                },
                {
                    name: 'Пешком',
                    icon: 'icons/walk.svg',
                    key: 'walk'
                }
            ],
            onChange: (e)=>console.log(e)
        } as ChoiceIconIE

        const hotelOptions = {
            options:[
                {
                    name: 'Отель',
                    icon: 'icons/hotel.svg',
                    key: 'hotel'
                },
                {
                    name: 'Хостел',
                    icon: 'icons/hostel.svg',
                    key: 'hostel'
                },
                {
                    name: 'Апартаменты',
                    icon: 'icons/apart.svg',
                    key: 'apart'
                },
            ],
            onChange: (e)=>console.log(e)
        } as ChoiceIconIE



        const ratingOptions = {
            options:[
                {
                    name: '1',
                    icon: 'icons/stars/1.svg',
                    key: '1'
                },
                {
                    name: '2',
                    icon: 'icons/stars/2.svg',
                    key: '2'
                },
                {
                    name: '3',
                    icon: 'icons/stars/3.svg',
                    key: '3'
                },
                {
                    name: '4',
                    icon: 'icons/stars/4.svg',
                    key: '4'
                },
                {
                    name: '5',
                    icon: 'icons/stars/5.svg',
                    key: '5'
                },
            ],
            onChange: (e)=>backend.post('/onboarding/hotels/', {
                stars: e.map((value)=>Number(value))
            }).then((response)=>setHotels(response.data.hotels))
        } as ChoiceIconIE
    

        const eatOptions = {
            options:[
                {
                    name: 'Кафе',
                    icon: 'icons/cafe.svg',
                    key: 'cafe'
                },
                {
                    name: 'Ресторан',
                    icon: 'icons/rest.svg',
                    key: 'rest'
                },
                {
                    name: 'Бар',
                    icon: 'icons/bar.svg',
                    key: 'bar'
                },
            ],
            onChange: (e)=>console.log(e)
        } as ChoiceIconIE
    
        const eatRatingOptions = {
            options:[
                {
                    name: '1',
                    icon: 'icons/stars/1.svg',
                    key: '1'
                },
                {
                    name: '2',
                    icon: 'icons/stars/2.svg',
                    key: '2'
                },
                {
                    name: '3',
                    icon: 'icons/stars/3.svg',
                    key: '3'
                },
                {
                    name: '4',
                    icon: 'icons/stars/4.svg',
                    key: '4'
                },
                {
                    name: '5',
                    icon: 'icons/stars/5.svg',
                    key: '5'
                },
            ],
            onChange: (e)=>console.log(e)
        } as ChoiceIconIE
    
    const attractionOptions = {
            options:[
                {
                    name: 'Park',
                    icon: 'icons/park.png',
                    key: 'park'
                },
                {
                    name: 'Monument',
                    icon: 'icons/monument.png',
                    key: 'monument'
                },
                {
                    name: 'Museum',
                    icon: 'icons/museum.png',
                    key: 'museum'
                },
                {
                    name: 'Unesco',
                    icon: 'icons/unesco.png',
                    key: 'unesco'
                },
                {
                    name: 'Exhibition',
                    icon: 'icons/exhibition.png',
                    key: 'exhibition'
                },
            ],
            onChange: (e)=>backend.post('/onboarding/event/', {
                types: e
            }).then((response)=>setEvents(response.data.events))

        } as ChoiceIconIE








    const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Транспорт`,
          children: 
          <div>
            <div>
                <h2>Как вы предпочитаете добираться</h2>
                <ChoiceIcon {...transportOptions}></ChoiceIcon>
            </div>
            <div>
                <h2>Как вы предпочитаете передвигаться на месте</h2>
                <ChoiceIcon {...transportCityOptions}></ChoiceIcon>
            </div>
          </div>
          ,
        },
        {
          key: '2',
          label: `Проживание`,
          children: <div>
                        <div>
                            <h2>Где вы предпочитаете остановится</h2>
                            <ChoiceIcon {...hotelOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Рейтинг</h2>
                            <ChoiceIcon {...ratingOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Выберите понравившеися вам отели</h2>
                            <div className='hotelsCardWrapper'>
                                    {
                                        hotels.map((hotel:HotelCardIE)=><HotelCard key={hotel.title} {...hotel}></HotelCard>)
                                    }
                            </div>
                        </div>
                    </div>,
        },
        {
          key: '3',
          label: `Питание`,
          children: <div>
                        <div>
                            <h2>Где вы предпочитаете есть</h2>
                            <ChoiceIcon {...eatOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Рейтинг</h2>
                            <ChoiceIcon {...eatRatingOptions}></ChoiceIcon>
                        </div>
                    </div>
        },
        {
            key: '4',
            label: `Развлечения`,
            children: <div>
                        <div>
                            <h2>Что вы хотите увидеть</h2>
                            <ChoiceIcon {...attractionOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Выберите самое интересное</h2>
                            <div className='hotelsCardWrapper'>
                                    {
                                        events.map((event:AttractionCardIE)=>{
                                            return <AttractionCard key={event.oid} {...event}></AttractionCard>
                                        })
                                    }
                            </div>
                        </div>
                    </div>,
          },
      ];
    



    return(
        <div className="prefsbg">
            <div className="prefs">
                <div className="prefsHeadWrapper">
                    <h1>Мои предпочтения</h1>
                    <div style={{color:'rgba(29, 29, 29, 0.5)'}}>Отметьте свои предпочтения, чтобы мы смогли предоставить лучшие рекомендации туров</div>
                </div>
                <Tabs activeKey={activeTab.toString()} items={items} onChange={(e)=>setActiveTab(Number(e))} />
                <Button className="btn-y" onClick={()=> setActiveTab((activeTab+1)%5)}>Далее</Button>
            </div>
        </div>
        
    );
}