import React, { useEffect, useState } from "react";
import { Carousel, Spin, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Button } from "../Button";
import './style.css'
import { ChoiceIcon, ChoiceIconIE } from "../ChoiceIcon";
import { syncBuiltinESMExports } from "module";
import axios from "axios";
import { backend } from "../../consts";
import { HotelCard, HotelCardIE } from "../HotelCard";
import { AttractionCard, AttractionCardIE } from "../AttractionCard";
import { useNavigate } from "react-router-dom";
export const Prefernces = () =>{
    const [activeTab, setActiveTab] = useState(1)
    const [hotels, setHotels] = useState([])
    const [events, setEvents] = useState([])

   

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
                    name: 'Парки',
                    icon: 'icons/park.png',
                    key: 'park'
                },
                {
                    name: 'Памятники',
                    icon: 'icons/monument.png',
                    key: 'monument'
                },
                {
                    name: 'Музеи',
                    icon: 'icons/museum.png',
                    key: 'museum'
                },
                {
                    name: 'Культурное наследие',
                    icon: 'icons/unesco.png',
                    key: 'unesco'
                },
                {
                    name: 'Выставки ',
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
                <h2>Как добраться до города</h2>
                <ChoiceIcon {...transportOptions}></ChoiceIcon>
            </div>
            <div>
                <h2>Как передвигаться по городу</h2>
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
                            <h2>Где остановиться</h2>
                            <ChoiceIcon {...hotelOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Рейтинг</h2>
                            <ChoiceIcon {...ratingOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Выберите понравившиеся вам отели</h2>
                            <div className='hotelsCardWrapper'>
                                    {
                                        hotels.length == 0? <Spin></Spin>:
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
                            <h2>Где поесть</h2>
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
                            <h2>Что посмотреть</h2>
                            <ChoiceIcon {...attractionOptions}></ChoiceIcon>
                        </div>
                        <div>
                            <h2>Выберите понравившиеся вам места</h2>
                            <div className='hotelsCardWrapper'>

                                    {
                                        events.length == 0? <Spin></Spin>:
                                        events.map((event:AttractionCardIE)=>{
                                            return <AttractionCard key={event.oid} {...event}></AttractionCard>
                                        })
                                    }
                            </div>
                        </div>
                    </div>,
          },
      ];
    
    let navigate = useNavigate()

    const onNextClick = () =>{
        setActiveTab((activeTab+1)%5)
        if (activeTab+1 == 5){
            localStorage.setItem('firstAuth', 'false');
            navigate('/')
        }
    }
    return(
        <div className="prefsbg">
            <div className="prefs">
                <div className="prefsHeadWrapper">
                    <h1>Мои предпочтения</h1>
                    <div style={{color:'rgba(29, 29, 29, 0.5)'}}>Отметьте свои предпочтения, чтобы мы смогли предоставить лучшие рекомендации туров</div>
                </div>
                <Tabs activeKey={activeTab.toString()} items={items} onChange={(e)=>setActiveTab(Number(e))} />
                <Button className="btn-y" onClick={()=> onNextClick()}>Далее</Button>
            </div>
        </div>
        
    );
}