import React, { useState } from "react";
import { DatePicker, Select } from 'antd';
import { RusPassHeader } from "../../elements/Header";
import { Block } from "../../elements/Block";
import { Button } from "../../elements/Button";
import { TourCard, TourCardIE } from "../../elements/TourCard";

const { RangePicker } = DatePicker;

export const GenerateTour = () =>{
    
    const [dates, setDates] = useState()
    const [theme, setTheme] = useState('jack')

    const [generate, setGenerate] = useState(false)



    const TourPropsCard = {
        title: 'Я покажу тебе Москву',
        days: 8,
        imageURL: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
        placeCards: [
           {
              title:'Парк Горького',
              type: 'Место',
              imageURL:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
           },
           {
              title:'Отель Москва',
              type: 'Отель',
              imageURL:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
           },
           {
              title:'Ресторан Сказка',
              type: 'Ресторан',
              imageURL:'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
           }
        ]
     } as TourCardIE
     
    let tours = []

    for (let i=0; i<=5; i++){
        tours.push(
            <TourCard {...TourPropsCard}></TourCard>
        )
    }

    return(
        <div>
            <RusPassHeader></RusPassHeader>
            <div>
                <Block className="">
                    <div>
                        <RangePicker
                            onChange={(e)=>setDates(e as any)}
                        ></RangePicker>
                        <Select
                            defaultValue="lucy"
                            style={{ width: 120 }}
                            value={theme}
                            onChange={(e)=>setTheme(e)}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                                { value: 'disabled', label: 'Disabled'},
                            ]}
                        />
                        <Button onClick={()=>setGenerate(!generate)} className="btn-y">Сгенирировать</Button>
                    </div>
                    
                    <div>
                        {
                            generate? tours:null
                        }
                    </div>

                </Block>
            </div>
        </div>
    );
}
