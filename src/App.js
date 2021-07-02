import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'
import StartBtn from './components/StartBtn';
import { Provider } from 'react-redux';
import store from './store';
import GooLogin from './components/oauth/GooLogin'
import GooLogout from './components/oauth/GooLogout';
import KakaoLogin from './components/oauth/KakaoLogin';
import KakaoLogout from './components/oauth/KakaoLogout';
import NaviBar from './components/NaviBar';
import MainPage from './Pages/MainPage';


function App() {
  return (
    <Provider store={store}>
      <Route>
        {/* <Route exact path="/"
          render={() => (
            <LandingPage />
          )} /> */}
        <SettingModal exact/>
        <MainPage />
        {/* <StartBtn /> */}
      </Route>
    </Provider>
  );
}

export default App;
