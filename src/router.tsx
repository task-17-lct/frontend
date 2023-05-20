import {
    createBrowserRouter
} from 'react-router-dom'
import App from './App'
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { EventMatch } from './pages/EventMatch';
import { GenerateTour } from './pages/GenerateTour';


const routes = [
    {
        path: '/index',
        element: <App></App>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/event-match',
        element: <EventMatch></EventMatch>
    },
    {
        path: '/generate',
        element: <GenerateTour></GenerateTour>
    }

]

export const router = createBrowserRouter(routes);
