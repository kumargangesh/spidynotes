import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FrontPage from './Frontend/FrontPage'
import Test from './Component/Test'
// import Navbar from './Frontend/Navbar'
// import Routing from './Frontend/Routing'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Navbar /> */}
    {/* <Routing /> */}
    <FrontPage />
    {/* <Test /> */}
  </StrictMode>,
)
