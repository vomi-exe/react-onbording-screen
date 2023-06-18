import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FlowContextProvider } from './context/FlowContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FlowContextProvider>
      <App />
    </FlowContextProvider>
  </React.StrictMode>
);
