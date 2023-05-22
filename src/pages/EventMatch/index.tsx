import react, { useRef } from 'react'
import TinderCard from 'react-tinder-card'
import './style.css'
import { Block } from '../../elements/Block'
import { Card, TinderCardContent } from '../../elements/Card'
import { Button } from '../../elements/Button'
import { startTinder, swipe, } from '../../client'
import {useNavigate} from 'react-router-dom';

interface IEventData{
    title: string;
    description: string;
    id: string;
}


export const EventMatch: react.FC = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const started = useRef(false);
    const swiping = useRef(false);
    const [cardData, setCardData] = react.useState({title: "", description: "", id: ''} as IEventData);
    const data  = react.useRef({title: "", description: "", id: ''} as IEventData)


    if (!started.current) {
        started.current = true;
        startTinder().then((e) => {
            
            data.current = {
                title: e.title,
                description: e.description.split(' ').slice(0, 10).join(' '),
                id: e.oid
            };
            setCardData({
                title: e.title,
                description: e.description.split(' ').slice(0, 10).join(' '),
                id: e.oid
            });
        })
    }


    return <div className='centered tin'>
    <Block className='tinder-block'>
        <TinderCard ref={ref} onSwipe={(type) => {
            console.log("swipe");
            if (swiping.current) return;
            swiping.current = true;
            swipe(data.current.id, type).then((e) => {
                if (!e) {
                    navigate('/');
                    return;
                }
                data.current = {
                    title: e.event.title,
                    description: e.event.description.split(' ').slice(0, 10).join(' '),
                    id: e.event.oid
                };
                setCardData(
                    {
                        title: e.event.title,
                        description: e.event.description.split(' ').slice(0, 10).join(' '),
                        id: e.event.oid
                    }
                );
                setTimeout(() => {
                    (ref.current as any).restoreCard();
                    swiping.current = false;
                }, 2000);
            })
            
        }}>
            <Card className=''>
                <TinderCardContent
                    title={data.current.title}
                    description={data.current.description}
                ></TinderCardContent>
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