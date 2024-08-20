import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import SnakeGame from './pages/SnakeGame';

import { LanguageProvider } from './components/LanguageContext';
import './styles/normalize.css'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <LanguageProvider>
        <Routes>
          <Route path="/" element={<SnakeGame />}/>
          <Route path="/SnakeGame" element={<SnakeGame />}/>
        </Routes>
    </LanguageProvider>
        
  </HashRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
