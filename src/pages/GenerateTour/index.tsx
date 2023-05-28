import React, { useEffect, useState } from "react";
import { DatePicker, Select } from 'antd';
import { RusPassHeader } from "../../elements/Header";
import { Block } from "../../elements/Block";
import { Button } from "../../elements/Button";
import { TourCard, TourCardIE } from "../../elements/TourCard";
import './style.css'
import axios from "axios";
import { backend } from "../../consts";
const { RangePicker } = DatePicker;

export const GenerateTour = () =>{
    
    const [dates, setDates] = useState()
    const [theme, setTheme] = useState('jack')
    const [generate, setGenerate] = useState(false)
    const [toursData, setToursData] = useState(new Array<TourCardIE>())

    useEffect(()=>{
        if (toursData.length == 0){
            backend.get('/route/build').then((data)=>setToursData(data.data))
        }
    })
    
    console.log(toursData)





     
    let tours = new Array()

    toursData.forEach((tour, index) => {
        let points = new Array()
        tour.points.forEach((point, index)=>{
            points.push({
                cords:[point.location[1], point.location[0]],
                title: point.title,
                description: point.description
            }
            )
        })
        tours.push(
            <TourCard {...tour} mapPoints={points as any} id={index.toString()}></TourCard>
        )
    })

        

    return(
        <div>
            <RusPassHeader></RusPassHeader>
            <div className='generateTourContent'>
                <Block className="generateTourBlock">
                    <div className="tourToolBar">
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
                    <h2>Рекомендованные Туры</h2>
                    <div className="tourCardsWrapper">
                        {
                            generate? tours:null
                        }
                    </div>

                </Block>
            </div>
        </div>
    );
}
