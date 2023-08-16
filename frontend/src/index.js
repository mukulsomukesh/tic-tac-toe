import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./Redux/store"
import { Provider } from 'react-redux';


import { extendTheme, ChakraProvider } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    50: '#FFF3E0',
    100: '#333333',
    200: '#8D6E63',
    300:"#ff923e"
  },
}

const theme = extendTheme({ colors })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
