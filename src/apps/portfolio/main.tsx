import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App_pi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
