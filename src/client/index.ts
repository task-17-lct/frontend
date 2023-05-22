import axios from 'axios';
import { origin } from './config';


export const register = async (username: string, password: string) => {
    await axios.post(
        origin + 'api/auth/register/',
        {
            'username': username,
            'email': username,
            'password': password
        }
    )
}

export const signin = async (username: string, password: string) => {
    const response = await axios.post(
        origin + 'api/auth/token/',
        {
            'username': username,
            'password': password
        }
    );
    return response.data;
}


export const startTinder = async () => {
    const data = await axios.get(
        origin + 'api/tinder/start',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    );
    return data.data;
}

export const swipe = async (itemId: string, type: string) => {
    var url = origin + 'api/tinder/' + itemId + '/proceed/';
    console.log(url, itemId)
    try{
        const data = await axios.post(
            url,
            {
                'action': type,
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
        return data.data;
    } catch {
        return false
    }

}