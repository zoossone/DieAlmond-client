import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import styled from 'styled-components';
import headerImg from '../img/sky.jpeg'
import SettingModal from '../components/SettingModal/SettingModal'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

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
const Btn = styled.div`
display: flex;
justify-content: center;
`;

const LandingPage = ({resetStore}) => {
    const [login, setLogin] = useState(false)
    const [trialLogin, setTrialLogin] = useState(false)
    const history = useHistory()

    resetStore()
    
    const handleLoginModal = () => {
        setLogin(!login)
    }

    const handleSettingLoginModal = () => {
        // setTrialLogin(!trialLogin)
        history.push('/mymy')
    }

    return (
        <div>
            <Header>
                <div>
                    <h1>DieAlmond</h1>
                    <h3>Let's value life more</h3>
                </div>
            </Header>
            <Btn>
                <LoginModalBtn onClick={handleLoginModal}>Login</LoginModalBtn>
                {login === false ?
                    null :
                    <LoginModal />
                }
                <LoginModalBtn onClick={handleSettingLoginModal}>Trial</LoginModalBtn>
                {/* {trialLogin === false ?
                    null :
                    <SettingModal />
                } */}
            </Btn>
            <Footer />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return { resetStore: () => dispatch(actionCreators.resetInfo())}
}

export default connect(null,mapDispatchToProps)(LandingPage);