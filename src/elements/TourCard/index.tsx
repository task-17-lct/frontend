import React from "react";
import { Button } from '../../elements/Button'
import { Block } from '../../elements/Block'
import './style.css'

export interface PlaceCardIE{
    title:string,
    type: string,
    imageURL?: string
}

export interface TourCardIE{
    title:string,
    days:number, 
    placeCards: PlaceCardIE[],
    imageURL?: string
}

export const PlaceCard: React.FC<PlaceCardIE> = (props) =>{
    return(
        <div className="placeCard">
            <div className="placeDescrWrapper">
                <div>{props.title}</div>
                <div className="placeType">{props.type}</div>
            </div>
            <img className="placeImage" src={props.imageURL}></img>
        </div>
    );
}

export const TourCard:React.FC<TourCardIE> = (props) =>{
    

    return(
        <Block className='tourcard-block'>
            <div className="cardDescr">
                <div className="cardTitle">
                    <div className="titleText">{props.title}</div>
                    <div className="cardInfo">
                        <div>{props.days} дней,</div>
                        <div>{props.placeCards.length} мест</div>
                    </div>
                </div>
                <img  className="cardAvatar" src={props.imageURL}></img>
                
            </div>
            <div className="placesWrapper">
                {
                    props.placeCards.map((value, index) => <PlaceCard {...value}></PlaceCard>)
                }
            </div>
            <Button className=''>Посмотреть</Button>

        </Block>
    );

    
}