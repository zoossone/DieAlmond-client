import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LandingPage = () => {
    // 모달창 상태 여기서만 필요하니가 리덕스 굳이 안써도될듯 ㅇㅇ
    const [login, setLogin] = useState(false)

    const LoginModalBtn = styled.button`
        background-color: #00FFFF;
        text-decoration: none;
        border: none;
        padding: 10px;
        color: black;
        border-radius: 30px;
        cursor: grab;
    `;

    const StartBtn = styled.button`
        background-color: #00FFFF;
        text-decoration: none;
        border: none;
        padding: 10px;
        color: black;
        border-radius: 30px;
        cursor: grab;
    `;

    const handleLoginModal = () => {
        setLogin(!login)
    }
    return (
        <div>
            <NaviBar />
            <header>
                <h1>DieAlmond</h1>
                <p>introduction</p>
            </header>
            <img src="#" />
            <div>
                <LoginModalBtn onClick={handleLoginModal}>로그인</LoginModalBtn>
                {login === false ?
                    null :
                    <LoginModal handleLoginModal={handleLoginModal}/>
                }
                <StartBtn><Link to='/main'>시작하기</Link></StartBtn>
            </div>
            <Footer/>
        </div>
    );
};

export default LandingPage;