import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Stairs from './components/common/Stairs.jsx'
import NavContext from './context/NavContext.jsx'
import ThemeProvider from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Stairs>
          <NavContext>
            <App />
          </NavContext>
        </Stairs>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
