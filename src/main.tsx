import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { NovuProvider } from './context/novu-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NovuProvider>
      <App />
    </NovuProvider>
  </StrictMode>,
)
