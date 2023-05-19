import React from "react";
import './style.css'

export const RusPassHeader:React.FC = () =>{
    return(
        <div className="headerWrapper">
            <div className="iconWrapper">
                <img className="headerIcon" src='logo.svg'></img>
                <img className="headerIcon" src='menu.svg'></img>
                <img className="headerIcon" src='bonus.svg'></img>
                <img className="headerIcon" src='search.svg'></img>

            </div>
            <div className="iconWrapper">
                <img className="headerIcon" src='language.svg'></img>
                <img className="headerIcon" src='support.svg'></img>
                <img className="headerIcon" src='favorites.svg'></img>
                <img className="headerIcon" src='profile.svg'></img>
            </div>
        </div>
    );
}