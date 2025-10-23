import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppState from './context/AppState.jsx'
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
  <AppState>
    <App />
  </AppState>
  </StrictMode>
  </BrowserRouter>
)
