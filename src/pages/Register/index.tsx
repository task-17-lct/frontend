import react from 'react'
import { Block } from '../../elements/Block'
import { Input } from '../../elements/Input'
import './style.css'
import { Button } from '../../elements/Button'
import { register, signin } from '../../client'
import { useNavigate } from "react-router-dom";

const yandexConnect = require('react-yandex-login')

const {YandexLogin, YandexLogout} = yandexConnect;
const clientID = '11e53cfa7add4c55b84168d408a22eb1';


export const Register: react.FC = () => {
    const navigate = useNavigate();
    const [username, setUseranme] = react.useState('');
    const [password, setPassword] = react.useState('');


    return <div className='centered'>
        <Block className='reg-block'>
            <h4>Регистрация</h4>
            <Input placeholder='Почта' className='reg-input' onChange={setUseranme}/>
            <Input placeholder='Пароль' className='reg-input' onChange={setPassword}/>
            <Input placeholder='Пароль еще раз' className='reg-input'/>
            <Button className='' onClick={() => {
                register(username, password).then((e) => {
                    signin(username, password).then((e) => {
                        localStorage.setItem('firstAuth', 'true');
                        localStorage.setItem('token', e.access);
                        navigate('/')
                    });
                });
            }}>Зарегистрироваться</Button>
            <div className="separator">
                <div className="sep-item"></div>
                <span>или</span>
                <div className="sep-item"></div>
            </div>
            <Button className='login-btn-y' onClick={()=>navigate('/login')}>Войти</Button>

        </Block>
    </div>
}