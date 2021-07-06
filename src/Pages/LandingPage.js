import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import styled from 'styled-components';
import headerImg from '../img/sky.jpeg'
import SettingModal from '../components/SettingModal/SettingModal'

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
const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
background:url(${headerImg}) no-repeat;
`;
const Gif = styled.div`
    height: 60vh;
    width: 500px;
`;
const Btn = styled.div`
display: flex;
justify-content: center;
`;

const LandingPage = () => {
    const [login, setLogin] = useState(false)
    const [trialLogin, setTrialLogin] = useState(false)

    const handleLoginModal = () => {
        setLogin(!login)
    }

    const handleSettingLoginModal = () => {
        setTrialLogin(!trialLogin)
    }

    return (
        <div>
            <Header>
                <div>
                    <h1>DieAlmond</h1>
                    <h3>Let's value life more</h3>
                    {/* <Gif /> */}
                </div>
            </Header>
            <Btn>
                <LoginModalBtn onClick={handleLoginModal}>Login</LoginModalBtn>
                {login === false ?
                    null :
                    <LoginModal handleLoginModal={handleLoginModal} />
                }
                <LoginModalBtn onClick={handleSettingLoginModal}>Trial</LoginModalBtn>
                {trialLogin === false ?
                    null :
                    <SettingModal />
                }
            </Btn>
            <Footer />
        </div>
    );
};

export default LandingPage;