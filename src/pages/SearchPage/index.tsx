import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backend } from "../../consts";
import data from './struct.json';
import { RouteCard } from "../../elements/RouteCard";
import { RusPassHeader } from "../../elements/Header";
import { AutoComplete, DatePicker, Input, Checkbox, Select } from 'antd';
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from 'dayjs';
import { Button } from "../../elements/Button";
import './style.css'
const { RangePicker } = DatePicker;


export const SearchPage:React.FC = () =>{
    let { prefs } = useParams();
    const [cities, setCities] = useState([])

    let props = data.map((day)=>{
        let paths = day.paths
        for (let i=0; i<paths.length; i++){
            if (paths[i].type != 'point'){
                paths.splice(i,1)
                i--
            }
        }
        return {
            date:day.date,
            paths: paths
        }
    })
    
    useEffect(()=>{
        if (cities.length == 0){
            backend.get('/data/cities').then((response)=>setCities(response.data))
        }
        // backend.post('/route/build', props).then((response)=>console.log(response.data))
    })

    
    const [city, setCity] = useState('')
    const [dates, setDates] = useState([])
    let searchParams = {}
 
    if (dates.length == 2){
       searchParams = {
          date_from: new Date((dates as any)[0]).toISOString().split('T')[0],
          date_to: new Date((dates as any)[1]).toISOString().split('T')[0],
          city: city
       }
    }
 
    const disabledDate: RangePickerProps['disabledDate'] = (current:any) => {
       // Can not select days before today and today
       return current && current < dayjs().endOf('day');
     };
 
    let navigate = useNavigate()
    const [toolsOpened, setToolsOpened] = useState(false)
    return(
        <div className="mainWrapper">
            <RusPassHeader></RusPassHeader>
            <h1>Посмотрите, что мы нашли по вашему запросу</h1>
            <div>
            <div style={{borderRadius: toolsOpened? '20px 20px 0px 0px':'20px'}} className='toolsMainWrapper'>
                            <div className='rowWrapper' onClick={()=>setToolsOpened(!toolsOpened)}>
                                <img src='/filter.svg'></img>
                                <div>Фильтры</div>
                            </div>
                            <img src='/react.svg'></img>
                            <Select
                                className='antdBorder'
                                showSearch
                                placeholder="Выберите направление"
                                optionFilterProp="children"
                                onChange={(e)=>setCity(e)}
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

                            <img src='/react.svg'></img>
                            <RangePicker
                                disabledDate={disabledDate}
                                onChange={(e)=>setDates(e as any)}
                            ></RangePicker>
                            <img src='/react.svg'></img>
                            <Button className='btn-y' onClick={()=>navigate('search/' + JSON.stringify(searchParams))}>Сгенерировать</Button>
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
                    <div className='mainCard'>
                        <div className='cardWrapper'>
                            <RouteCard options={props as any}></RouteCard>
                            <RouteCard options={props as any}></RouteCard>
                            <RouteCard options={props as any}></RouteCard>
                            <RouteCard options={props as any}></RouteCard>
                         <RouteCard options={props as any}></RouteCard>
                         <RouteCard options={props as any}></RouteCard>
                         <RouteCard options={props as any}></RouteCard>

                        </div>
                    </div>
                

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