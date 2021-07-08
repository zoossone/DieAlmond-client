import React, { useEffect, useState } from 'react';
import Today from '../components/Aside/Today';
import BucketLists from '../components/Aside/BucketLists';
import CountDown from '../components/CountDownTimer/CountDown';
import ProgressBar from '../components/ProgressBar'
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import Almond from '../components/Almond/Almond'
import WiseSaying from '../components/Almond/WiseSaying'
import { connect } from 'react-redux';
import axios from 'axios';
import {actionCreators} from '../store';
import { useHistory } from 'react-router';

const MainPage = ({ userInfo, addInfo }) => {
    // Dummy Data
    // const userInfo = {
    //     // nickName : '아몬드'
    // }

    const history = useHistory();

    // if (typeof (userInfo.nickName) !== 'string') {
    //     history.push('/mymy')
    // }

    useEffect(() => {
        axios.get('http://localhost:80/main', {
        headers: {
            'sns':'google',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.google}`
        },
        withCredentials: true
    })
        .then(res => {
            console.log(res.data.userifo)
            if(typeof(res.data.userinfo.nickname) === 'string') {
                addInfo(res.data.userinfo);
            } else {
                history.push('/mymy');
            }
        })
        .catch(e => e);
    }, []) 
    

    console.log(userInfo)
    

    // 삼항 연산자 추가
    return (
        <div>
            <NaviBar />
            <Today />
            <h1> '{userInfo.nickName}'님의 남은 인생은.. </h1>
            <CountDown userInfo={userInfo}/>
            <BucketLists />
            <div>
            <WiseSaying />
            <Almond userInfo={userInfo}/>
            </div>
            <ProgressBar />
            <Footer />
        </div>
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

function mapDispatchToProps(dispatch) {
    return {addInfo: (info) => dispatch(actionCreators.addInfo(info))}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);