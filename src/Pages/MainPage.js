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
    
    const [nickname, setNickname]=useState('');
    const [sleep, setSleep]=useState(0);
    const [smoking, setSmoking]=useState(0);
    const [alcohol, seyAlcohol]=useState(0);
    const [restLife, setRestLife]=useState(0);
    const [reren, setReren] = useState({});
    
    useEffect(() => {
        if(userInfo.google){
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
                } else {
                    history.push('/mymy');
                }
            })
            .catch(e => e);
        }
    }, []) 
    

    // console.log(userInfo)
    

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