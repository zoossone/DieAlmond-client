import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import StartBtn from './components/StartBtn';
import MyBucketListPage from './Pages/MyBucketListPage'

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
