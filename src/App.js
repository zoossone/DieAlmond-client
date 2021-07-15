import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route } from "react-router-dom"
import StartBtn from './components/StartBtn';
import MyPage from './Pages/MyPage';
import BucketListPage from './Pages/BucketListPage';
import EasterEgg2 from './components/EasterEgg/EasterEgg2';

function App() {
  return (
    <div>
      <Route exact path="/"
        render={() => (
          <LandingPage />
        )} />

      <Route exact path="/mymy"
        render={() => (
          <MyPage />
        )} />

      <Route path="/bucket"
        render={() => (
          <BucketListPage />
        )} />

      <StartBtn />
      <EasterEgg2 />
    </div>
  );
}

export default App;
