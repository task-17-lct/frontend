import React, { useState } from "react";
import './style.css'
export interface ChoiceIconIE{
    onChange: (key:string[]) => void
    options:{
        icon:string,
        name: string,
        key:string
    }[]
}

export const ChoiceIcon:React.FC<ChoiceIconIE> = (props) => {
    let startActives = new Array<boolean>()
    
    for (let i=0; i < props.options.length; i++){
        startActives.push(false)
    }

    const [state, setState] = useState({
        actives: startActives,
        keys: new Array<string>()
    })
   

    const onChange = (key:string, index:number) =>{
        let localActives = state.actives
        localActives[index] = !localActives[index]

        if (localActives[index]){
            props.onChange([...state.keys, key])
            setState(
                {
                    keys: [...state.keys, key],
                    actives: localActives
                }
            )

        } else{
            let localKeys = state.keys
            if (localKeys.indexOf(key) != -1){
                localKeys.splice(localKeys.indexOf(key), 1)
                if (localKeys.length > 0){
                    props.onChange(localKeys)
                }
                setState(
                    {
                        keys: localKeys,
                        actives: localActives
                    }
                )

            }
        }
    }

    let icons = new Array<JSX.Element>()

    props.options.forEach((item, index)=>{
            icons.push(
            <div key={index.toString()+item.name} className="choiceBtnWrapper" onClick={()=>onChange(item.key, index)}>
                <img className={state.actives[index]? 'choiceBtnActive':"choiceBtn"} src={item.icon}></img>
                {item.name}
            </div>
            )
    })
    return(
        <div className="choiceIconWrapper">
            {
               icons
            }
        </div>
    );
}