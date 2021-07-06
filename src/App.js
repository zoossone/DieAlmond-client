import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import StartBtn from './components/StartBtn';
import MyBucketListPage from './Pages/MyBucketListPage'
import MainPage from './Pages/MainPage';
import MyPage from './Pages/MyPage';
import AllBucketList from './components/AllBucketList';

function App() {
  return (
//     <div>
//       <Route exact path="/"
//         render={() => (
//           <LandingPage />
//         )} />
//       <Route path="/my"
//         render={() => (
//           <MyBucketListPage />
//         )} />


// <Route exact path="/mymy"
//         render={() => (
//           <MyPage />
//         )} />


//       <StartBtn />
    // </div>
    <>
    <Route exact path='/abk' component={AllBucketList} />
    <Route exact path='/main' component={MainPage} />
    <Route exact path='/my' component={MyPage}/>
    </>
  );
}

export default App;
