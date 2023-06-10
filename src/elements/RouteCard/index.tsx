import React, { useState } from "react";
import { Button } from '../../elements/Button'
import { Block } from '../../elements/Block'
import './style.css'
import { MyMap } from "../map";
import Sidebar from "react-sidebar";
import { PlaceCard } from "../TourCard";
import { Collapse, Tabs, TabsProps } from "antd";
import { backend } from "../../consts";
import { useNavigate } from "react-router-dom";
import { EventCard } from "../EventCard";
import { PanelRoute } from "../PanelRoute";

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


export const RouteCard:React.FC<RouteCardIE> = (props) =>{

    const [showMap, setShowMap] = useState(false)
    const [selectedDay, setSelectedDay] = useState('0')
    const [liked, setLiked] = useState(false)
    
    let navigate = useNavigate()
    let cntPlaces = 0
    const [changePoint, setChangePoint] = useState<any>()

    if (changePoint != undefined){
        for (let i = 0; i < props.options[changePoint.day].paths.length; i++) { 
            console.log(props.options[changePoint.day].paths[i])
            if (props.options[changePoint.day].paths[i].point.oid == changePoint.point_to_change) { 
                props.options[changePoint.day].paths[i] = changePoint.new_point; 
                // i--; 
            }
        }
        // if (cnt > 0){
        //     props.options[changePoint.day].paths.push(changePoint.new_point)
        // }
    }


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

    const items: TabsProps['items'] = props.options.map((day, index)=>{

        return {
            key:index.toString(),
            label: (index+1).toString() + 'день',
            children: <div className="placesWrapper">
                {day.paths.map((value) => <PlaceCard 
                                                title={value.point.title}
                                                description={value.point.description}
                                                icon='/icons/not_found.jpeg'
                                                location={[value.point.lon, value.point.lat]}
                                            ></PlaceCard>)
                }
            </div>
        }
    })
    const colapseItems: TabsProps['items'] = props.options.map((day, index)=>{

        return {
            key:index.toString(),
            label: (index+1).toString() + 'день',
            children: <Collapse
                        bordered={false}
                    >
                {
                day.paths.map((value, index2) =>{

                    return <Panel header={value.point.title} key={'collapse'+index.toString()+index2.toString()}>
                            <PanelRoute onChange={
                                (oid)=>backend.get('/onboarding/'+oid+'/get_json_event')
                                    .then((e)=>setChangePoint(
                                        {
                                            point_to_change:value.point.oid,
                                            new_point: e.data,
                                            day:index
                                        } as any
                                ))} 
                                index={index} index2={index2} value={value}></PanelRoute>
                        </Panel> 
                }
                       
                )
                }
            </Collapse>

        }
    })
    
    const onLiked = () =>{
        // backend.get('route/list').then((e)=>console.log(e.data))
        let paths = props.rawProps.path

        // if (changePoint != undefined){
        //     console.log(paths[changePoint.day])

        //     for (let i = 0; i < paths[changePoint.day].paths.length; i++) { 
        //         console.log(paths[changePoint.day].paths[i])
        //         if (paths[changePoint.day].paths[i].point.oid == changePoint.point_to_change) { 
        //             paths[changePoint.day].paths.splice(i, 1); 
        //           i--; 
        //         }
        //     }
        //     paths[changePoint.day].paths.push(changePoint.new_point)
        // }
        backend.post('route/save', {
            points:paths
        }).then((e)=>console.log(e.data))
        setLiked(!liked)
    }

    const onBuy = () =>{
        
        if (localStorage.getItem('token') != null){

            let paths = props.rawProps.path

            // if (changePoint != undefined){
            //     console.log(paths[changePoint.day])
    
            //     for (let i = 0; i < paths[changePoint.day].paths.length; i++) { 
            //         console.log(paths[changePoint.day].paths[i])
            //         if (paths[changePoint.day].paths[i].point.oid == changePoint.point_to_change) { 
            //             paths[changePoint.day].paths.splice(i, 1); 
            //           i--; 
            //         }
            //     }
            //     paths[changePoint.day].paths.push(changePoint.new_point)
            // }
            backend.post('route/save', {
                points: paths
            }).then((e)=>backend.get('buy/' + e.data.id + '/add_to_buy/'))
            navigate('/buyed')
        }
    }
    return(
        <div key={props.city + props.options[0].paths[0].point.oid}>
            <Sidebar
                sidebar={
                    <div className='sidebarContent'>
                        <MyMap points={points}></MyMap>
                        <Tabs className="TabsRouteCard" defaultActiveKey="0" items={colapseItems} onChange={(e:string)=>setSelectedDay(e)} />
                        <Button className='' onClick={()=>onBuy()}>КУПИТЬ</Button>
                        <Button className='btn-y route-btn' onClick={()=>setShowMap(!showMap)}>Закрыть</Button>
                    </div> 
                    }
                open={showMap}
                rootClassName='mainCardContent'
                contentClassName="mainCardContent"
                sidebarClassName="tourCardSidebar"
                styles={{ sidebar: { background: "white"}}}
            >
                
            <Block className='tourcard-block'>
                <div className="cardDescr">
                    <div className="cardTitle">
                        <div className="titleText">{props.city}</div>
                        <div className="cardInfo">
                            <div>{props.options.length} дней,</div>
                            <div>{cntPlaces} мест</div>
                        </div>
                    </div>
                    <img  className="cardAvatar" src='/icons/not_found.jpeg'></img>
                </div>
                <Tabs defaultActiveKey="1" items={items} onChange={(e:string)=>setSelectedDay(e)} />
                <div className="btnWrapper">
                    <div className="yOpenBtn" onClick={()=>setShowMap(!showMap)}>
                        <div className="yOpenBtnTitle">От 5000 рублей</div>
                        <div className="yOpenBtnDescr">Просмотреть план тура</div>
                    </div>
                    <div className="likeBtn" onClick={()=>onLiked()}>
                        <img src={liked? '/icons/likedHeart.svg':'/icons/heart.svg'}></img>
                    </div>
                </div>
            </Block>
            </Sidebar>
        </div>
        
    );
}