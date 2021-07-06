import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import StartBtn from './components/StartBtn';
import MyBucketListPage from './Pages/MyBucketListPage'
import MainPage from './Pages/MainPage';
import MyPage from './Pages/MyPage';
import BucketListPage from './Pages/BucketListPage';

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
    </div>
  );
}

export default App;
