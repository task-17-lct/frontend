import React, { useState } from "react";
import './style.css'

export interface FavoriteCardIE{
    title: string,
    location:string, 
    imageURL:string
}

export const FavoriteCard:React.FC<FavoriteCardIE> = (props) =>{
    const [liked, setLiked] = useState(false)

    return (
        <div className="favoriteCard">
            <div>
                <img className="imageFavoriteCard" src={props.imageURL}></img>
                <img onClick={()=>setLiked(!liked)} className="likeButton" src={liked? 'likeButtonActive.svg':'likeButton.svg'}></img>
            </div>
            <div className="titleFavoriteCard">{props.title}</div>
            <div className="locationFavoriteCard">{props.location}</div>
        </div>
    );
}