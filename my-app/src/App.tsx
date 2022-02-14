import React from 'react';
import './App.css';
import { Home } from './components/Home';
import GlobalFonts from './fonts/fonts';

function App() {
  return (
    <div >
      <GlobalFonts />
      <Home />
    </div>
  );
}

export default App;
