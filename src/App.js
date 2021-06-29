import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'
import StartBtn from './components/StartBtn';

function App() {
  return (
    <Route>
      <Route exact path="/"
        render={() => (
          <LandingPage />
        )} />
      {/* <SettingModal /> */}
      <StartBtn />
    </Route>
  );
}

export default App;
