import React, { useState } from "react";
import { Button } from '../../elements/Button'
import { Block } from '../../elements/Block'
import './style.css'
import { MyMap } from "../map";
import Sidebar from "react-sidebar";

export interface PlaceCardIE{
    title:string,
    description: string,
    icon: string,
    location: number[]

}

export interface TourCardIE{
    name:string,
    description:string,
    days:number, 
    points: PlaceCardIE[],
    imageURL?: string;
    id?: string
    mapPoints: number[][]
}

export const PlaceCard: React.FC<PlaceCardIE> = (props) =>{
    return(
        <div className="placeCard">
            <div className="placeDescrWrapper">
                <div>{props.title}</div>
                <div className="placeType">{props.description.slice(0,50)}</div>
            </div>
            <img className="placeImage" src={props.icon}></img>
        </div>
    );
}

export const TourCard:React.FC<TourCardIE> = (props) =>{
    
    const [showMap, setShowMap] = useState(false)


    return(
        <div id={props.id}>
            <Sidebar
                sidebar={
                    <div className='sidebarContent'>
                        <MyMap points={props.mapPoints}></MyMap>
                        <Button className='btn-y' onClick={()=>setShowMap(!showMap)}>Закрыть</Button>
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
                        <div className="titleText">{props.name}</div>
                        <div className="cardInfo">
                            <div>{props.days} дней,</div>
                            <div>{props.points.length} мест</div>
                        </div>
                    </div>
                    <img  className="cardAvatar" src={props.imageURL}></img>
                    
                </div>
                <div className="placesWrapper">
                    {
                        props.points.map((value, index) => <PlaceCard {...value}></PlaceCard>)
                    }
                </div>
                <Button className='' onClick={()=>setShowMap(!showMap)}>Посмотреть</Button>

            </Block>
            </Sidebar>
        </div>
        
    );

    
}