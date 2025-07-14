import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'  // 加入我們的樣式

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)