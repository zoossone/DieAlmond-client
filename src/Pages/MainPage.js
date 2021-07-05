import React, { useState } from 'react';
import Today from '../components/Aside/Today';
import BucketLists from '../components/Aside/BucketLists';
import CountDown from '../components/CountDownTimer/CountDown';
import ProgressBar from '../components/ProgressBar'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'


const MainPage = () => {
    const userInfo = {
        nickName : '아몬드'
    }

    return (
        <div>
           <NaviBar />
           <Today />
           <div> {userInfo.nickName}님의 남은 인생은.. </div>
           <CountDown />
           <BucketLists />
           <ProgressBar />
           <Footer />
        </div>
    );
};

export default MainPage;