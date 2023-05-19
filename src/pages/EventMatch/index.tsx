import react, { useRef } from 'react'
import TinderCard from 'react-tinder-card'
import './style.css'
import { Block } from '../../elements/Block'
import { Card, TinderCardContent } from '../../elements/Card'
import { Button } from '../../elements/Button'


export const EventMatch: react.FC = () => {
    const ref = useRef(null);
    var [createNew, setCreateNew] = react.useState(true);


    return <div className='centered tin'>
    <Block className='tinder-block'>
        <TinderCard ref={ref} onSwipe={() => {
            console.log("swipe");
            setTimeout(() => {
                (ref.current as any).restoreCard();
            }, 2000);
        }}>
            <Card className=''>
                <TinderCardContent></TinderCardContent>
            </Card>
        </TinderCard>
    </Block>

    <Block className='tin-dir'>
        <Button className='' onClick={() => {
            (ref.current as any).swipe('left')
        }}>Не нравится</Button>
        <Button className='main-btn'>На главную</Button>
        <Button className='' onClick={() => {
            (ref.current as any).swipe('right')
        }}>Нравится</Button>
    </Block>
   </div>
}