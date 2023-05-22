import react from 'react'
import './style.css'

interface ICard{
    children: string | react.ReactNode;
    className: string;
}


export const Card: react.FC<ICard> = (props) => {

   return <div className={'card__container ' + props.className}>{props.children}</div>
}


interface ITinderCard{
    title: string;
    description: string;
}

export const TinderCardContent: react.FC<ITinderCard> = (props) => {
    return <Card className='tinder-card__card'>
        <img src='/sample.jpg' width={200} height={200}></img>
        <div className="tinder__content">
            <span><strong>Название:</strong> {props.title}</span>

            <span><strong>Описание: </strong>{props.description}</span>
        </div>
    </Card>
}