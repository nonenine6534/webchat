import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Punto de entrada de la aplicación:
// busca el <div id="root"> del index.html y monta el
// componente principal <App /> dentro de él.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
