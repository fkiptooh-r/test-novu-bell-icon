import React from 'react';
import './App.css';
import { NotificationSystem } from './components/notification';
export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <>
        <NotificationSystem/>
        </>
      </main>
    </div>
  )
}
