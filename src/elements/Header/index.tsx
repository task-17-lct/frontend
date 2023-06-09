import React from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

export const RusPassHeader:React.FC = () =>{
    let navigate = useNavigate()
    return(
        <div className="padding">
            <div className="headerWrapper">
                <div className="iconWrapper">
                    <img className="headerIcon" src='/logo.svg' onClick={()=>navigate('/')}></img>
                    <img className="headerIcon delete600" src='/menu.svg' onClick={()=>navigate('/')}></img>
                    <img className="headerIcon delete600" src='/bonus.svg' onClick={()=>navigate('/event-match')}></img>
                    <img className="headerIcon delete600" src='/search.svg' onClick={()=>navigate('/')}></img>
                </div>
                <div className="iconWrapper">
                    <img className="headerIcon delete600" onClick={()=>navigate('/buyed')} src='/language.svg'></img>
                    <img className="headerIcon" src='/favorites.svg' onClick={()=>navigate('/favorites')}></img>
                    <img className="headerIcon" src='/profile.svg'onClick={()=>navigate('/login')} ></img>
                </div>
            </div>
        </div>
        
    );
}