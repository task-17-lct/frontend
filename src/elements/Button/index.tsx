import react from 'react'
import './style.css'


interface IButton {
    children: string | react.ReactNode;
    className: string;
    onClick?: () => void;
}

export const Button: react.FC<IButton> = (props) => {
    var onClick = props.onClick
    if (!props.onClick) {
        onClick = () => {}
    }
    return <button className={'button ' + props.className} onClick={props.onClick}>
        {props.children}
    </button>
}