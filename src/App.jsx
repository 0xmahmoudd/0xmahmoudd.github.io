import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { WindowManagerProvider } from './context/WindowManagerContext';
import { Desktop } from './components/Desktop/Desktop';
import './styles/global.css';

export function App() {
  return (
    <SettingsProvider>
      <WindowManagerProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Desktop />} />
          </Routes>
        </Router>
      </WindowManagerProvider>
    </SettingsProvider>
  );
}

export default App;
