import React from 'react';
import { Link, Route } from 'react-router-dom';
import MainPage from '../Pages/MainPage'

const StartBtn = () => {

    return (
        <>
            {/* <Link to='/main'>Guest start</Link> */}
            <Route path='/main' component={MainPage} />
        </>
    );
};

export default StartBtn;