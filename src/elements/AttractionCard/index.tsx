import React, { useState } from "react";
import { backend } from "../../consts";
import { Button } from "../Button";
import './style.css'

export interface AttractionCardIE{
    city:string,
    description: string,
    oid: string,
    title:string,
    type:string
}

export const AttractionCard:React.FC<AttractionCardIE> = (props) =>{
    const [liked, setLiked] = useState(false)

    const onLiked = ()=>{
        backend.get('/onboarding/' + props.oid + '/add_to_favorites/')
        setLiked(!liked)
    }

    return(
        <div>
            <div className="hotelCard" >
                <div className="hotelCardTools">
                    <div></div>
                    <img className="likeHotelBtn" onClick={()=>onLiked()} src={liked? 'icons/liked.svg':'icons/unliked.svg'}></img>
                </div>
                
                <img className="hotelImg" src='icons/not_found.jpeg'></img>
                <h5>{props.title}</h5>
                <div className="hotelCardRow">
                    <div>{props.description}</div>
                </div>
            </div>
        </div>
        
    );
}