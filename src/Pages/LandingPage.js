import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import styled from 'styled-components';
import landingImg from '../img/imgTest.png'
import SettingModal from '../components/SettingModal/SettingModal'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import font from '../font.css'

const Landing1 = styled.div`
    width: 100vw;
    height: 100vh;

    @media screen and (max-width: 780px) {
        display: flex;
        flex-direction: column;
    }
`

const Landing2 = styled.div`
    background-color: pink;
    width: 100vw;
    height: 100vh;
`

const Landing3 = styled.div`
    background-color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
`

const Title = styled.div`
    position: center;
    margin-top: 20px;
    font-size: 40px;
    font-family: 'CookieRunOTF-Black';
    text-align: center;
    color: pink;

    @media screen and (max-width: 780px) {
        flex-direction: column;
    }
`

const Img = styled.img`
    position: relative;
    top: 50px;
    left: 50px;
    width: 45%;
    height: auto;

    @media screen and (max-width: 780px) {
        display: block;
        top: 50px;
        left: 0px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
`

const IntroTitle = styled.div`
    position: relative;
    top: 75px;
    left: 100px;

    font-family: 'CookieRun-Regular';
    font-size: 60px;
    line-height: 75px;
    text-align: right;

    color: pink;

    @media screen and (max-width: 780px) {
        top: 75px;
        left: 0px;
        font-size: 30px;
        line-height: 35px;
        text-align: center;
    }
`

const IntroSubTitle = styled.div`
    position: relative;
    top: 125px;
    left: 100px;
    font-family: 'CookieRun-Regular';
    font-size: 25px;
    line-height: 40px;
    text-align: right;
    color: grey;

    @media screen and (max-width: 780px) {
        top: 100px;
        left: 0px;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }
`

const NavBtn = styled.div`
    position: relative;
    top: 200px;
    left: 350px;
    display: flex;

    @media screen and (max-width: 780px) {
        top: 125px;
        left: 50px;
        text-align: center;
    }
`

const LoginModalBtn1 = styled.button`
    margin-right: 20px;
    border-radius: 25px;
    background-color: white;
    border-color: pink;
    color: pink;
    cursor: pointer;
    width: 150px;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    
    &:hover {
        color: grey;
        background-color: pink;
    }

    @media screen and (max-width: 780px) {
        width: 100px;
        height: 40px;
    }
`;

const LoginModalBtn2 = styled.button`
    border-radius: 25px;
    background-color: white;
    border-color: pink;
    color: pink;
    cursor: pointer;
    width: 150px;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    
    &:hover {
        color: grey;
        background-color: pink;
    }

    @media screen and (max-width: 780px) {
        width: 100px;
        height: 40px;
    }
`;

const Flex = styled.div `
    display: flex;

    @media screen and (max-width: 780px) {
        flex-direction: column;
    }
`

const LandingPage = ({resetStore}) => {
    const [login, setLogin] = useState(false)
    const [trialLogin, setTrialLogin] = useState(false)
    const history = useHistory()

    localStorage.clear()
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
            <Landing1>
                    <Title>DieAlmond</Title>

                

                <Flex>
                    <Img src={landingImg}></Img>   
                    <div>
                        <IntroTitle>
                            죽음은 지금 이 순간에도 
                            <br />
                            다가오고 있습니다.
                        </IntroTitle>
                        <IntroSubTitle>
                            우리는 언젠가 죽습니다. 
                            <br />
                            피할 수 없는 이 죽음이라는 운명을 
                            <br/>
                            외면하지 않고 선택의 순간에 활용한다면 
                            <br/>
                            더 진실 된 삶을 살 수 있습니다.
                            <br/>
                            <b>여러분의 남은 수명을 확인해보세요!</b>
                        </IntroSubTitle>

                        <NavBtn>
                            <LoginModalBtn1 onClick={handleLoginModal}>회원가입 / <br/>로그인</LoginModalBtn1>
                                {login === false ?
                                    null :
                                    <LoginModal handleLoginModal={handleLoginModal}/>
                                }
                                <LoginModalBtn2 onClick={handleSettingLoginModal}>비회원</LoginModalBtn2>
                                {/* {trialLogin === false ?
                                    null :
                                    <SettingModal />
                                } */}
                        </NavBtn>
                    </div> 
                </Flex>
            </Landing1>


            <Landing2>
                랜딩페이지2
            </Landing2>

            <Landing3>
                랜딩페이지3
            </Landing3>
>>>>>>> dev
            <Footer />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return { resetStore: () => dispatch(actionCreators.resetInfo())}
}

export default connect(null,mapDispatchToProps)(LandingPage);