import react from 'react'
import './style.css'

interface IInput{
    placeholder: string;
    className: string;
}

export const Input: react.FC<IInput> = (props) => {
    return <input type="text" className={'input__container ' +props.className} placeholder={props.placeholder}/>
}