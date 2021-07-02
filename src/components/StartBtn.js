import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from '../Pages/MainPage'

const StartBtn = () => {

    return (
        <>
            <Route path='/main' component={MainPage} />
        </>
    );
};

export default StartBtn;