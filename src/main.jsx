import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import ContextSearch from './context/ContextSearch.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter> 
    <GoogleOAuthProvider clientId='152811620261-ugg2uib91kkhmiv3ki1l8fnt988c41bv.apps.googleusercontent.com'> 
      <ContextSearch>
        <App />
      </ContextSearch>
    </GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
