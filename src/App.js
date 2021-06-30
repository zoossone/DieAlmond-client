import React from 'react';
import LandingPage from './Pages/LandingPage';
import { Route, Redirect } from "react-router-dom"
import SettingModal from './components/SettingModal/SettingModal'
import StartBtn from './components/StartBtn';
import Provider from 'react-redux';
import stoe from './store';

function App() {
  return (
    <Provider store={store}>
      <Route>
        <Route exact path="/"
          render={() => (
            <LandingPage />
          )} />
        {/* <SettingModal /> */}
        <StartBtn />
      </Route>
    </Provider>
  );
}

export default App;
