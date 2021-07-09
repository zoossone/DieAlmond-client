import React, { useState } from 'react';
import Today from '../components/Aside/Today';
import BucketLists from '../components/Aside/BucketLists';
import CountDown from '../components/CountDownTimer/CountDown';
import ProgressBar from '../components/ProgressBar'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import Almond from '../components/Almond/Almond'
import WiseSaying from '../components/Almond/WiseSaying'
import SettingModal from '../components/SettingModal/SettingModal'
import styled from 'styled-components';

const MainPage = () => {
    // Dummy Data
    const userInfo = {
        nickName : '아몬드'
    }

    const Gravestone = styled.img`
        width: 40px;
        position: fixed;
        top: 53.25%;
        right: 0%;
    `
    
    // 삼항 연산자 추가
    return (
        <div>
            {Object.keys(userInfo).length === 0 ? <SettingModal /> : '' }
            <NaviBar />
            <Today />
            <h1> {userInfo.nickName}님의 남은 인생은.. </h1>
            <CountDown />
            <BucketLists />
            <WiseSaying />
            <Almond />
            <Gravestone src={require("../img/gravestone.png").default}/>
            <ProgressBar />
            <Footer />
        </div>
    );
};

export default MainPage;