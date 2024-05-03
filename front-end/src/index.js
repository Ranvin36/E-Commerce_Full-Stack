import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store,{persistor} from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import SearchProvider from "./context/context.tsx"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchProvider>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </SearchProvider>
        </Provider>
      </BrowserRouter>
);

