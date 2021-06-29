import React from 'react';
import LandingPage from './Pages.js/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'
import Aside1 from './components/Aside1';

function App() {
  return (
    <div>
      {/* <LandingPage />
      <SettingModal /> */}
      <Aside1 />
    </div>
  );
}

export default App;
