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
import styled from 'styled-components';

const Loader = styled.div`
position: absolute;
left: 50%;
top: 50%;
z-index: 1;
width: 120px;
height: 120px;
margin: -76px 0 0 -76px;
border: 16px solid #f3f3f3;
border-radius: 50%;
border-top: 16px solid #35A88E;
-webkit-animation: spin 2s linear infinite;
animation: spin 2s linear infinite;

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Div = styled.div`
position: absolute;
left: 50%;
top: 50%;
z-index: 1;
width: 120px;
height: 120px;
margin: 80px 0 0 -76px;
font-weight: bold;
`

const MainPage = ({ userInfo, addInfo }) => {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

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
                    setIsLoading(false);
                } else {
                    history.push('/mymy');
                }
            })
            .catch(e => e);
        } 
        
        if (localStorage.getItem("isLogin") === 'login' && localStorage.getItem("info")) {
            addInfo(JSON.parse(localStorage.getItem("info")))
            setIsLoading(false);
        } else {
            addInfo(JSON.parse(localStorage.getItem("info")))
            setIsLoading(false);
        }
    }, [isLoading]) 
    

    const Gravestone = styled.img`
        width: 40px;
        position: fixed;
        top: 53.25%;
        right: 0%;
    `
    
    // 삼항 연산자 추가
    return (
        <div>
            {console.log(userInfo)}
            {isLoading === true ? <div><Loader /><Div>잠시만 기다려주세요.</Div></div> : <>
            <NaviBar />
            <Today />
            <h1> '{userInfo.nickname}'님의 남은 인생은.. </h1>
            <CountDown userInfo={userInfo} />
            <BucketLists userInfo={userInfo}/>
            <div>
            <WiseSaying />
            <Almond userInfo={userInfo}/>
            </div>
            <ProgressBar userInfo={userInfo}/>
            <Footer />
            </>}
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