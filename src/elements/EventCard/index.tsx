import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { backend } from "../../consts";
import { Button } from "../Button";
import './style.css'

export interface EventCardIE{
    category: string,
    description: string,
    lat: number,
    lon: number,
    oid: string,
    title: string
}

enum category{
    'attractions' = 'Развлечения', 
    'museum' = 'Музей', 
    'movie' = 'Кино', 
    'concert' = 'Концерт', 
    'artwork' = 'Арт', 
    'plays' = 'Игры', 
    'shop' = 'Магазин', 
    'gallery' = 'Галерея', 
    'theme_park' = 'Тематический парк', 
    'viewpoint' = 'Достопримечательность', 
    'zoo' = 'Зоопарк'
}


export const EventCard:React.FC<EventCardIE> = (props) =>{
    let location = useLocation()

    const [liked, setLiked] = useState(location.pathname == '/favorites'? true:false)

    const onLiked = ()=>{
        if (localStorage.getItem('token') != null){
            backend.get('/onboarding/' + props.oid + '/add_to_favorites/')
            setLiked(!liked)
        }
    }
    console.log(location) 

    return(
        <div key={props.oid}>
            <div className="hotelCard" >
                <div className="hotelCardTools">
                    <div></div>
                    <img className="likeHotelBtn" onClick={()=>onLiked()} src={liked? '/icons/liked.svg':'/icons/unliked.svg'}></img>
                </div>
                
                <img className="hotelImg" src='/icons/not_found.jpeg'></img>
                <h5>{props.title}</h5>
                <div className="hotelCardRow">
                    <div>{props.description.length > 50? props.description.slice(0,100)+'...': props.description}</div>
                </div>
            </div>
        </div>
        
    );
}