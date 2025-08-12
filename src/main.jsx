import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FrontPage from './Frontend/FrontPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FrontPage />
  </StrictMode>,
)
