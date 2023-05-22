import react from 'react'
import './style.css'

interface IInput{
    placeholder: string;
    className: string;
    onChange?: (content: string) => void;
}

export const Input: react.FC<IInput> = (props) => {
    var onChange = props.onChange;
    if (!onChange) {
        onChange = (e: string) => {}
    }
    return <input 
        type="text" 
        className={'input__container ' +props.className} 
        placeholder={props.placeholder}
        onChange={(e) => (onChange as any)(e.target.value)}
    />
}