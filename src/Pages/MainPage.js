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

    const history = useHistory();

    // let userSrc = JSON.parse(localStorage.getItem("state"))

    // console.log(userSrc)

    // if (typeof(userInfo.nickname) !== 'string') {
    //     addInfo(userSrc)
    // }
    
    useEffect(() => {

        if(localStorage.getItem("isLogin") === 'login'){
            axios.get('http://localhost:80/main', {
            headers: {
                'sns':'google',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.userinfo)
                if(typeof(res.data.userinfo.nickname) === 'string') {
                    addInfo(res.data.userinfo);
                    console.log(res.data.userinfo, userInfo)
                    localStorage.setItem("info", JSON.stringify(res.data.userinfo))
                } else {
                    history.push('/mymy');
                }
            })
            .catch(e => e);
        } 
        
        if (localStorage.getItem("isLogin") === 'login' && localStorage.getItem("info")) {
            addInfo(JSON.parse(localStorage.getItem("info")))
        } else {
            addInfo(JSON.parse(localStorage.getItem("info")))
        }
    }, []) 
    

    // console.log(userInfo)
    

    // 삼항 연산자 추가
    return (
        <div>
            {console.log(userInfo)}
            <NaviBar />
            <Today />
            <h1> '{userInfo.nickname}'님의 남은 인생은.. </h1>
            <CountDown userInfo={userInfo}/>
            <BucketLists userInfo={userInfo}/>
            <div>
            <WiseSaying />
            <Almond userInfo={userInfo}/>
            </div>
            <ProgressBar userInfo={userInfo}/>
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