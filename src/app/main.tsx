import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '../styles/globals.css'
import '../styles/cyberpunk.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found. Make sure index.html has <div id="root"></div>')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
