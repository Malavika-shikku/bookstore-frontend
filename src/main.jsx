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
    <GoogleOAuthProvider clientId='390023175737-1porb5f8tfegfdk0vkgua36g2g5ijsdf.apps.googleusercontent.com'> 
      <ContextSearch>
        <App />
      </ContextSearch>
    </GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)
