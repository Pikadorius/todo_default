import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {TodolistsList} from './features/TodolistsList/TodolistsList';
import {Login} from './features/Login/Login';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <h1 style={{display:'flex', justifyContent: 'center'}}>ERROR 404</h1>,
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
        <RouterProvider router={router}/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
