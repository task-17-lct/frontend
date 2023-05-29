import react, { useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import './style.css'
import { Block } from '../../elements/Block'
import { Card, TinderCardContent } from '../../elements/Card'
import { Button } from '../../elements/Button'
import { dailySelectionBuild, dailySelectionGenerate, saveTinderPath, startTinder, swipe, } from '../../client'
import {useNavigate} from 'react-router-dom';
import { MyMap } from '../../elements/map'

interface IEventData{
    title: string;
    description: string;
    id: string;
}


export const EventMatch: react.FC = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const started = useRef(false);
    const [dailyData, setDailyData] = useState([]);
    const [resData, setResData] = useState<any[]>([]);
    const queried = useRef(false);
    const [answerData, setAnswerData] = useState([]);

    if (!started.current) {
        started.current = true;
        dailySelectionGenerate().then((e) => {
            console.log(e)
            setDailyData(e.events);
        })
    }

    return <div className='centered tin'>
    <Block className='tinder-block'>
        {
            dailyData.map((e) => {
                return <TinderCard 
                    ref={ref} 
                    className='card'
                    onSwipe={(type) => {
                        console.log(dailyData.indexOf(e))
                        if (dailyData.indexOf(e) == 0) {
                            if (!resData.length) return;
                            if (!queried.current) {
                                dailySelectionBuild(resData).then((e) => {
                                    setAnswerData(e.path);
                                });
                                queried.current = true;
                            }
                        }
                        
                        if (type == 'right') {
                            setResData(resData.concat([
                                {
                                    'action': 'right',
                                    'oid': (e as any).oid
                                } as any
                            ]))
                        }
                        
                    }}
                >
        
                    <Card className=''>
                        <TinderCardContent
                            title={dailyData.length ? (e as any).title : ""}
                            description={dailyData.length ? (e as any).description.slice(0, 70) : ""}
                        ></TinderCardContent>
                    </Card>
                </TinderCard>
            })
        }
        <div className='cont-span'>
        {
            dailyData.length && !answerData.length ?
            (!queried.current ? 
            <div className='span-cont'><span className='span-er'>Вы не выбрали ни одного события, Мы не можем сгенерировать вам маршрут. Возвращяйтесь к нам завтра. <a 
            href="" onClick={() => {
                navigate('/');
            }}
            >Вернуться на главную</a></span></div> : <span>Подождите немного, мы генерируем для вас ежедневный маршрут</span>) : answerData.length ? <MyMap points={
                answerData.filter((e: any) => e.type == 'point').map((e: any) => {return {
                    cords: [e.point.lat, e.point.lon],
                    title: e.point.title,
                    description: ""
                }})
                
            }></MyMap> : <></>
        }
        {
            answerData.length ? <div className='btns'>
            <Button onClick={() => {
                saveTinderPath(answerData);
                navigate('/');
            }} className=''>
                Сохранить
            </Button>
            <Button onClick={() => {
                navigate('/');
            }} className=''>
                На главную
            </Button>
            </div> : <></>
        }
        </div>
        
    </Block>
   </div>
}