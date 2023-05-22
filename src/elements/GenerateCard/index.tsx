import React from "react";
import { Button } from '../Button'
import { Block } from '../Block'
import './style.css'






export const GenerateCard:React.FC = (props) =>{
    

    return(
        <Block className='generatecard-block'>
            <div className="generateCardDescr">
                <div className="generateCardTitle">
                    <div className="generateTitleText">Сгенерируй свой фантастический Тур!</div>
                </div>                
            </div>
            <img src='generateTour.png'></img>
            <Button className='generate-y'>Cгенерирвоать тур <img className="wand" src='magicWand.svg'></img></Button>

        </Block>
    );

    
}