import react from 'react'
import './style.css'



interface IBlock{
    children: string | react.ReactNode;
    className: string;
}

export const Block: react.FC<IBlock> = (props) => {

    return <div className={'block ' + props.className}>{(props as any).children}</div>
}