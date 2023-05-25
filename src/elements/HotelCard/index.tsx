import React, { useState } from "react";
import { Button } from "../Button";
import './style.css'

export interface HotelCardIE{
    address:string,
    can_buy:boolean,
    city:string,
    description:string,
    email:string,
    lat:number,
    lon:number,
    phones: {
        id:number,
        name:string,
        number: string
    }[],
    place?:any,
    polymorphic_ctype:number,
    priority: boolean,
    region: string,
    rooms:{
        amenities:string[],
        description:string,
        images: {
                source:{
                id:string
            }
        }[],
        integration_id:string,
        name:string,
        rate_plans:{
            description:string,
            integration_id:string,
            name:string
        }[]
    }[],
    sort:number,
    source: any,
    stars:number,
    title: string
}

export const HotelCard:React.FC<HotelCardIE> = (props) =>{
    const [liked, setLiked] = useState(false)
    const [opened, setOpened] = useState(false)
    console.log(props)
    return(
        <div>
            {
                opened? <div className="openHotelCardBG">
                    <div className="openHotelCard">
                        <h1>{props.title}</h1>
                        <div>
                            <h4>{props.address}</h4>
                            <div>
                                {props.phones.map((phone)=><div>{phone.name}  {phone.number}</div>)}
                            </div>
                        </div>
                        <div>
                            {props.rooms.map((room)=><div>
                                <h5>{room.name}</h5>
                                <div>{room.description}</div>
                            </div>
                            )}
                        </div>
                        <Button className="" onClick={()=>setOpened(!opened)}>Закрыть</Button>
                    </div>
                </div>:null
            }
            <div className="hotelCard">
                <div className="hotelCardTools">
                    <div className="ratingTile">{props.stars}*</div>
                    <img className="likeHotelBtn" onClick={()=>setLiked(!liked)} src={liked? 'icons/liked.svg':'icons/unliked.svg'}></img>
                </div>
                
                <img className="hotelImg" src='icons/not_found.jpeg'></img>
                <h3>{props.title}</h3>
                <div className="hotelCardRow">
                    <div>{props.address}</div>
                    {
                        props.rooms == null? null:<div>{props.rooms.length} видов номеров</div>

                    }
                </div>
                <Button className="hotelBtn" onClick={()=>setOpened(!opened)}>Посмотреть</Button>
            </div>
        </div>
        
    );
}