import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/nunito'
import './global.css'
import { initI18n } from './i18n'
import { App } from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

initI18n()

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
