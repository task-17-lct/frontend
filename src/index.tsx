import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {router} from './router';
import {RouterProvider} from 'react-router-dom'
import {ConfigProvider } from 'antd';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
    theme={{
          token: {
            colorPrimary: '#FFCF08',
          },
        }}
      >
    <RouterProvider router={router} />

  </ConfigProvider>
  </React.StrictMode>
);
