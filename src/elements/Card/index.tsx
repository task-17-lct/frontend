import react from 'react'
import './style.css'

interface ICard{
    children: string | react.ReactNode;
    className: string;
}


export const Card: react.FC<ICard> = (props) => {

   return <div className={'card__container ' + props.className}>{props.children}</div>
}

export const TinderCardContent: react.FC = (props) => {
    return <Card className='tinder-card__card'>
        <img src='/sample.jpg' width={200} height={200}></img>
        <div className="tinder__content">
            <span><strong>Отель:</strong> Ромашка</span>
            <span><strong>Звезд:</strong> 4</span>

            <span><strong>Описание: </strong>Очень хороший отель с видом на море</span>
        </div>
    </Card>
}