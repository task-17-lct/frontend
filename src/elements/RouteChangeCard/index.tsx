import React, { useState } from "react";
import { Button } from '../Button'
import { Block } from '../Block'
import './style.css'
import { MyMap } from "../map";
import Sidebar from "react-sidebar";
import { PlaceCard } from "../TourCard";
import { Collapse, Tabs, TabsProps } from "antd";
import { backend } from "../../consts";

export interface RouteCardIE{
    rawProps:any,
    city:string,
    options: {
        date:string,
        paths:({
            type:string
            distance:number,
            point_type:string,
            point:{
                lat:number,
                lon:number,
                title: string,
                description:string,
                oid:string
            }
        })[]
    }[]
}

const { Panel } = Collapse;


export const RouteChangeCard:React.FC<RouteCardIE> = (props) =>{

    const [selectedDay, setSelectedDay] = useState('0')

    let cntPlaces = 0
    props.options.forEach((route)=>{
        cntPlaces += route.paths.length
    })

    let points = props.options[Number(selectedDay)].paths.map((path)=>{
            return {
                description:path.point.description,
                title: path.point.title,
                cords:[path.point.lon, path.point.lat]
            }
    })

    let remappedPoints = props.options[Number(selectedDay)].paths.map((path)=>{
        if (path.point_type == 'remapped_point'){
            return {
                description:path.point.description,
                title: path.point.title,
                cords:[path.point.lon, path.point.lat]
            }
        }

    })

    for (let i = 0; i < remappedPoints.length; i++) { 
        if (remappedPoints[i] == undefined) { 
            remappedPoints.splice(i, 1); 
            i--; 
        }
    }
    console.log(remappedPoints)



    const colapseItems: TabsProps['items'] = props.options.map((day, index)=>{

        return {
            key:index.toString(),
            label: (index+1).toString() + 'день',
            children: <Collapse
                        bordered={false}
                    >
                {
                day.paths.map((value, index2) => 
                        <Panel header={value.point.title} key={'collapse'+index.toString()+index2.toString()}>
                            <img style={{width:'200px'}} src='/icons/not_found.jpeg'></img> 
                            <p>{value.point.description}</p>
                        </Panel>
                )
                }
            </Collapse>

        }
    })
    

    return(
        <div className='sidebarChangeContent' key={props.city + props.options[0].paths[0].point.oid}>
                <div className="titleText">{props.city}</div>
                <MyMap remapedPoints={remappedPoints as any} points={points}></MyMap>
                <Tabs className="tabs" defaultActiveKey="0" items={colapseItems} onChange={(e:string)=>setSelectedDay(e)} />
        </div>
        
    );
}