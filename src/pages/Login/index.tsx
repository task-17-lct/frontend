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


export const Login: react.FC = () => {
    const navigate = useNavigate();
    const [username, setUseranme] = react.useState('');
    const [password, setPassword] = react.useState('');


    return <div className='centered'>
        <Block className='reg-block'>
            <h4>Вход</h4>
            <Input placeholder='Почта' className='reg-input' onChange={setUseranme}/>
            <Input placeholder='Пароль' className='reg-input' onChange={setPassword}/>
            <Button className='' onClick={() => {
                    signin(username, password).then((e) => {
                        console.log(e)
                        localStorage.setItem('token', e.access);
                        localStorage.setItem('firstAuth', 'true');

                        navigate('/')
                    });
            }}>Войти</Button>
            <div className="separator">
                <div className="sep-item"></div>
                <span>или</span>
                <div className="sep-item"></div>
            </div>
            <Button className='login-btn-y' onClick={()=>navigate('/register')}>Зарегистрироваться</Button>


        </Block>
    </div>
}