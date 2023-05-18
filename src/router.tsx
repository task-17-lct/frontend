import {
    createBrowserRouter
} from 'react-router-dom'
import App from './App'


const routes = [
    {
        path: '/index',
        element: <App></App>
    }
]

export const router = createBrowserRouter(routes);
