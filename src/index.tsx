import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import {TodolistsList} from './features/TodolistsList/TodolistsList';
import {Login} from './features/Login/Login';
import {common} from '@mui/material/colors';
import {createTheme, ThemeProvider} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: common['black']
        }
    }
})

const router = createHashRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <h1 style={{display: 'flex', justifyContent: 'center'}}>ERROR 404</h1>,
        children: [
            {
                path: '/',
                element: <TodolistsList/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
