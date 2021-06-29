import React from 'react';
import LandingPage from './Pages.js/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'

function App() {
  return (
    <div>
      <LandingPage />
      <SettingModal />
    </div>
  );
}

export default App;
