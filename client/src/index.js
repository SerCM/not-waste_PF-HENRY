import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);


const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI

root.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri= {`${redirectUri}/register`}>
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
