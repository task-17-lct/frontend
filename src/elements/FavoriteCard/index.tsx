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
            <div className="img-cnt">
                <img className="imageFavoriteCard" src={props.imageURL}></img>
                <img width={40} onClick={()=>setLiked(!liked)} className="likeButton" src={liked? 'likeButtonActive.svg':'likeButton.svg'}></img>
            </div>
            <div className="tr-cnt">
                <span className="titleFavoriteCard">{props.title}</span>
                <br />
                <span className="locationFavoriteCard">{props.location}</span>
            </div>
        </div>
    );
}