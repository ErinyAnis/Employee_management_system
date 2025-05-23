import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContext from './context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <AuthContext>
    <App />
  </AuthContext>,
)
