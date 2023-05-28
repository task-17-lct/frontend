import { AutoComplete, DatePicker, Input, Checkbox, Select, Radio, Space } from 'antd';
import react, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend } from '../../consts';
import { Button } from '../../elements/Button';

import './style.css'
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import { propTypes } from 'react-tinder-card';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export const Search:React.FC<{onSearch?:()=>void}> = (props) =>{

    const { RangePicker } = DatePicker;
    const [cities, setCities] = useState([])
    

    useEffect(()=>{
        if (cities.length == 0){
            backend.get('/data/cities').then((response)=>setCities(response.data))
        }
    })
    const [toolsOpened, setToolsOpened] = useState(false)
   
    const [city, setCity] = useState('')
    const [datesValue, setDatesValue] = useState([])
    const [transport, setTransport] = useState('walk')
    const [whatToSee, setWhatToSee] = useState<string[]>([])
    const [whereStay, setWhereStay] = useState<string[]>([])
    const [whereEat, setWhereEat] = useState<string[]>([])
    const [stars, setStars] = useState<number[]>([])

    const [withKids, setWithKids] = useState(false)
    const [withAnimals, setWithAnimals] = useState(false)

    const [dates, setDates] = useState<RangeValue>(null);

    const onWhatToSeeChange = (value:string, checked:boolean) =>{
      if (checked){
         setWhatToSee([...whatToSee, value])
      } else {
         let newData = whatToSee
         newData.splice(whatToSee.indexOf(value), 1)
         setWhatToSee(newData)
      }
    }

    const onStarsChange  = (value:number, checked:boolean) =>{
      if (checked){
         setStars([...stars, value])
      } else {
         let newData = stars
         newData.splice(stars.indexOf(value), 1)
         setStars(newData)
      }
    }

    const onWhereStay = (value:string, checked:boolean) =>{
      if (checked){
         setWhereStay([...whereStay, value])
      } else {
         let newData = whereStay
         newData.splice(whereStay.indexOf(value), 1)
         setWhereStay(newData)
      }
    }

    const onWhereEat = (value:string, checked:boolean) =>{
      if (checked){
         setWhereEat([...whereEat, value])
      } else {
         let newData = whereEat
         newData.splice(whereEat.indexOf(value), 1)
         setWhereEat(newData)
      }
    }


    let searchParams = {}
 
    if (datesValue.length == 2){
       searchParams = {
          date_from: new Date((datesValue as any)[0]).toISOString().split('T')[0],
          date_to: new Date((datesValue as any)[1]).toISOString().split('T')[0],
          city: city,
          stars:stars,
          what_to_see:whatToSee,
          where_stay: whereStay,
          where_eat: whereEat,
          with_kids: withKids,
          with_animals: withAnimals,
          movement: transport
       }
    }

    const disabledDate: RangePickerProps['disabledDate'] = (current:any) => {
      if (!dates) {
         return false;
       }

       const tooLate = dates[0] && current.diff(dates[0], 'days') >= 5;
       const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 5;

       return current && current < dayjs().endOf('day') || !!tooEarly || !!tooLate;;
     };
     const onOpenChange = (open: boolean) => {
      if (open) {
        setDates([null, null]);
      } else {
        setDates(null);
      }
    };
    let navigate = useNavigate()

    const onNavigate = () => {
      navigate('/search/' + JSON.stringify(searchParams))

      if (props != undefined){
         (props as any).onSearch()
      }
    }
    return (
        <div style={{width:'75%'}}>
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
                     onCalendarChange={(val) => {
                        setDates(val);
                     }}
                     onOpenChange={onOpenChange}
                     changeOnBlur
                     onChange={(e)=>setDatesValue(e as any)}
                  ></RangePicker>
                  <img src='/react.svg'></img>
                  <Button className='btn-y' onClick={()=>onNavigate()}>Сгенерировать</Button>
               </div>
               {
                  toolsOpened? <div className='searchOpened'>

                        <div className='questionWrapper'>
                           <h2>Где остановимся</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox onChange={(e)=>onWhereStay('hotel', e.target.checked)}>Отель</Checkbox>
                              <Checkbox onChange={(e)=>onWhereStay('hostel', e.target.checked)}>Хостел</Checkbox>
                              <Checkbox onChange={(e)=>onWhereStay('apartment', e.target.checked)}>Апартаменты</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Как перемещаться на месте</h2>
                           <div className='checkboxWrapper'>
                           <Radio.Group onChange={(e)=>setTransport(e.target.value)} value={transport}>
                              <Space direction="vertical">
                              <Radio value={'walk'}>Пешком</Radio>
                              <Radio value={'auto'}>Автомобиль</Radio>
                              <Radio value={'bike'}>Велосипед</Radio>
                              <Radio value={'scooter'}>Скутер</Radio>
                           </Space>
                           </Radio.Group>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Что посмотреть</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox onChange={(e)=>onWhatToSeeChange('museum', e.target.checked)}>Музеи и выставки</Checkbox>
                              <Checkbox onChange={(e)=>onWhatToSeeChange('attractions', e.target.checked)}>Развлечения</Checkbox>
                              <Checkbox onChange={(e)=>onWhatToSeeChange('concert', e.target.checked)}>Концерты</Checkbox>
                              <Checkbox onChange={(e)=>onWhatToSeeChange('movie', e.target.checked)}>Фильмы</Checkbox>
                              <Checkbox onChange={(e)=>onWhatToSeeChange('theme_park', e.target.checked)}>Тематические парки</Checkbox>
                              <Checkbox onChange={(e)=>onWhatToSeeChange('viewpoint', e.target.checked)}>Достопримечательности</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Где питаться</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox onChange={(e)=>onWhereEat('restaurant', e.target.checked)}>Рестораны</Checkbox>
                              <Checkbox onChange={(e)=>onWhereEat('cafe', e.target.checked)}>Кафе</Checkbox>
                              <Checkbox onChange={(e)=>onWhereEat('bar', e.target.checked)}>Бары</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Дополнительно</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox onChange={(e)=>setWithKids(e.target.checked)}>С детьми</Checkbox>
                              <Checkbox onChange={(e)=>setWithAnimals(e.target.checked)}>С животными</Checkbox>
                           </div>
                        </div>

                        <div className='questionWrapper'>
                           <h2>Рейтинг</h2>
                           <div className='checkboxWrapper'>
                              <Checkbox onChange={(e)=>onStarsChange(5, e.target.checked)}>5*</Checkbox>
                              <Checkbox onChange={(e)=>onStarsChange(4, e.target.checked)}>4*</Checkbox>
                              <Checkbox onChange={(e)=>onStarsChange(3, e.target.checked)}>3*</Checkbox>
                              <Checkbox onChange={(e)=>onStarsChange(2, e.target.checked)}>2*</Checkbox>
                              <Checkbox onChange={(e)=>onStarsChange(1, e.target.checked)}>1*</Checkbox>
                           </div>
                        </div>
                  </div>:null
               }
            </div>
    );
}