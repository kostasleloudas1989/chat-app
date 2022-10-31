import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import ServerContext  from './store/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ServerContext>
      <App />
    </ServerContext>
  </Provider>
);