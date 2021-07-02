import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'
import StartBtn from './components/StartBtn';
import MyBucketListPage from './Pages/MyBucketListPage';

function App() {
  return (
    <Route>
      <Route exact path="/"
        render={() => (
          <LandingPage />
        )} />

      <Route path="/my"
        render={() => (
          <MyBucketListPage />
        )} />
      {/* <SettingModal /> */}
      <StartBtn />
    </Route>
  );
}

export default App;
