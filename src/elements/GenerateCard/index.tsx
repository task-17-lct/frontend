import React from "react";
import { Button } from '../Button'
import { Block } from '../Block'
import './style.css'
import { useNavigate } from "react-router-dom";






export const GenerateCard:React.FC = (props) =>{
    let navigate = useNavigate()


    return(
        <Block className='generatecard-block'>
            <div className="generateCardDescr">
                <div className="generateCardTitle">
                    <div className="generateTitleText">Выбери свой Тур!</div>
                </div>                
            </div>
            <img src='generateTour.png'></img>
            <Button onClick={()=>navigate('/event-match')} className='generate-y'>Выбрать <img className="wand" src='magicWand.svg'></img></Button>
        </Block>
    );

    
}