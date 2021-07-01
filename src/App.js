import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'
import StartBtn from './components/StartBtn';
import GooLogin from './components/oauth/GooLogin'
import GooLogout from './components/oauth/GooLogout';
import KakaoLogin from './components/oauth/KakaoLogin';
import KakaoLogout from './components/oauth/KakaoLogout';
import NaviBar from './components/NaviBar';

function App() {
  return (
    <div>
      <Route exact path="/"
        render={() => (
          <LandingPage />
        )} />
      {/* <SettingModal /> */}
      <StartBtn />
      <Route exact path="/login"
        render={() => (
          <div>
            <GooLogin />
            <GooLogout />
            <KakaoLogin />
            <KakaoLogout />
          </div>
        )} />
    </div>
  );
}

export default App;
