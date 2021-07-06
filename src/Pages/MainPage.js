import React, { useState } from 'react';
import Today from '../components/Aside/Today';
import BucketLists from '../components/Aside/BucketLists';
import CountDown from '../components/CountDownTimer/CountDown';
import ProgressBar from '../components/ProgressBar'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import Almond from '../components/Almond/Almond'
import WiseSaying from '../components/Almond/WiseSaying'

const MainPage = () => {
    // Dummy Data
    const userInfo = {
        nickName : '아몬드',
    }

    return (
        <div>
            <NaviBar />
            <Today />
            <h1> {userInfo.nickName}님의 남은 인생은.. </h1>
            <CountDown />
            <BucketLists />
            <div>
            <WiseSaying />
            <Almond />
            </div>
            <ProgressBar />
            <Footer />
        </div>
    );
};

export default MainPage;