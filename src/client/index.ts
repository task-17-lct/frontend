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

export const dailySelectionGenerate = async () => {
    var data = await axios.get(
        origin + 'api/recommendations/get_daily_selection/',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    );
    return data.data;
}

export const dailySelectionBuild = async (buildData: any) => {
    var data = await axios.post(
        origin + 'api/recommendations/generate_daily_selection/',
        {nodes: buildData},
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    );
    return data.data;
}


export const saveTinderPath = async (tinderData: any) => {
    await axios.post(
        origin + 'api/route/save', {
            "points": [{
                date: '2000-01-01',
                paths: tinderData
            },]
        },
        
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
}