import react from 'react'
import { Block } from '../../elements/Block'
import { Input } from '../../elements/Input'
import './style.css'
import { Button } from '../../elements/Button'

const yandexConnect = require('react-yandex-login')

const {YandexLogin, YandexLogout} = yandexConnect;
const clientID = '11e53cfa7add4c55b84168d408a22eb1';


export const Register: react.FC = () => {

    return <div className='centered'>
        <Block className='reg-block'>
            <h4>Регистрация</h4>
            <Input placeholder='Почта' className='reg-input'/>
            <Input placeholder='Пароль' className='reg-input'/>
            <Input placeholder='Пароль еще раз' className='reg-input'/>
            <Button className=''>Зарегистрироваться</Button>
            <div className="separator">
                <div className="sep-item"></div>
                <span>или</span>
                <div className="sep-item"></div>
            </div>
            <YandexLogin clientID={clientID} onSuccess={() => {}}>
                <button className="btn-y">Yandex login</button>
            </YandexLogin>
        </Block>
    </div>
}