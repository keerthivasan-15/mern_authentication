import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GridBackground } from './background/GridBackground.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <GridBackground>
      <App />
  </GridBackground>
  </BrowserRouter>
  </StrictMode>,
)


