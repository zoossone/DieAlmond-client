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
import { actionCreators } from '../store';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import font from '../font.css'

const Screen1 = styled.div`
    width: 100vw;
    height: 70vh;
`

const Screen2 = styled.div`
    width: 100vw;
    height: 30vh;
`

const Section1 = styled.div`
    position: relative;
    bottom: 10px;
`

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
const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px;
    padding: 10px;
    font-family: 'CookieRunOTF-Black';
    
    // border: 1px solid black;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

const Aside1 = styled.div`
    font-family: 'CookieRunOTF-Black';
    font-size: 20px;
    color: pink;
`;

const Header = styled.div`
    font-family: 'CookieRunOTF-Black';
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Nickname = styled.div`
    font-family: 'CookieRunOTF-Black';
    margin: 0 0 50px 0;
    font-size: 3rem;
    color: pink;
    line-height: 3.2rem;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
`;

const Aside2 = styled.div`
    font-family: 'CookieRunOTF-Black';
    font-size: 20px;
    color: pink;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

const Dot = styled.div`
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`

const MainPage = ({ userInfo, addInfo }) => {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (localStorage.getItem("isLogin") === 'login') {
            axios.get('http://localhost:80/main', {
                headers: {
                    'sns': 'google',
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.google}`
                },
                withCredentials: true
            })
                .then((res) => {
                    console.log(res.data.msg)
                    if (typeof (res.data.userinfo.nickname) === 'string') {
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
            setIsLoading(false);
        } else {
            addInfo(JSON.parse(localStorage.getItem("info")))
            setIsLoading(false);
        }
    }, [])

    // 삼항 연산자 추가
    return (
        <div>
            {isLoading ? <div><Loader /><Div>잠시만 기다려주세요.</Div></div> :
                <>
                <Screen1>
                    <NaviBar />

                    <Title>

                        <Aside1>
                            <Today />
                            <WiseSaying />
                        </Aside1>

                        <Header>
                            <Nickname>'{userInfo.nickname}'님의 남은 인생은.. </Nickname>
                            <CountDown userInfo={userInfo}></CountDown>
                        </Header>

                        <Aside2>
                            <Dot> 죽기전에 해봐야지 </Dot>
                            <BucketLists userInfo={userInfo} />
                        </Aside2>

                    </Title>
                </Screen1>

                <Screen2>
                    <Section>
                        <Almond userInfo={userInfo} />
                        <ProgressBar userInfo={userInfo} />
                    </Section>
                </Screen2>                
                </>}
        </div>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { addInfo: (info) => dispatch(actionCreators.addInfo(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);