import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './StateProvider';
import { initialState, checkoutReducer } from './Reducer/checkoutReducer';

ReactDOM.render(
  <React.StrictMode>
  <StateProvider initialState={initialState} reducer={checkoutReducer}>
      <App />
  </StateProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

