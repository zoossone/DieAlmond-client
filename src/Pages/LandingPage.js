import React, { useEffect, useState } from 'react';
import LoginModal from '../components/LoginModal';
import Footer from '../components/Footer'
import styled, {createGlobalStyle} from 'styled-components';
import img1 from '../img/gameover.jpg'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const Landing1 = styled.div`
    postition: relative;
    top: 20px;
    width: 100vw;
    height: 100vh;
    
    @media screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`

const Title = styled.div`
    position: center;
    padding-top: 50px;
    font-size: 40px;
    font-family: 'CookieRunOTF-Black';
    text-align: center;
    color: pink;
    text-shadow: -4px 0 black, 0 4px black, 4px 0 black, 0 -4px black;

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const Img = styled.img`
    position: relative;
    top: 100px;
    right: 40px;
    width: 40%;
    height: 450px;

    @media screen and (max-width: 600px) {
        display: block;
        top: 50px;
        left: 0px;
        height: 200px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
`

const IntroTitle = styled.div`
    position: relative;
    top: 75px;

    font-family: 'CookieRun-Regular';
    font-size: 60px;
    line-height: 75px;
    text-align: right;

    color: pink;
    text-shadow: -3.5px 0 black, 0 3.5px black, 3.5px 0 black, 0 -3.5px black;

    @media screen and (max-width: 600px) {
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
    font-family: 'CookieRun-Regular';
    font-size: 25px;
    line-height: 40px;
    text-align: right;
    color: white;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    @media screen and (max-width: 600px) {
        top: 100px;
        left: 0px;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }
`

const B = styled.b`
    color: pink;
`

const NavBtn = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    @media screen and (max-width: 600px) {
        justify-content: center;
        margin-top: 40px;
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
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;

    
    &:hover {
        color: white;
        background-color: pink;
    }

    @media screen and (max-width: 600px) {
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
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    
    &:hover {
        color: white;
        background-color: pink;
    }

    @media screen and (max-width: 600px) {
        width: 100px;
        height: 40px;
    }
`;

const Flex = styled.div `
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 600px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const Foot = styled.footer`
    position: relative;
    bottom: 0px;
    // transform: translateY(500%)

    
`;


const LandingPage = ({resetStore}) => {
    const [login, setLogin] = useState(false)
    const history = useHistory()

    useEffect(() => {
        localStorage.clear()
        resetStore()
    })


    const handleLoginModal = () => {
        setLogin(!login)
    }

    const handleSettingLoginModal = () => {
        history.push('/mymy')
    }

    return (
        <div>
            <Landing1>
                    <Title>DieAlmond</Title>

                

                <Flex>
                <Img src={img1}></Img>  
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
                            <B>지금 바로 남은 수명을 확인해보세요!</B>
                            <NavBtn>
                            <LoginModalBtn1 onClick={handleLoginModal}>회원가입 / <br/>로그인</LoginModalBtn1>
                                {login === false ?
                                    null :
                                    <LoginModal handleLoginModal={handleLoginModal}/>
                                }
                                <LoginModalBtn2 onClick={handleSettingLoginModal}>비회원</LoginModalBtn2>
                            </NavBtn>
                        </IntroSubTitle>
                   </div>
                </Flex>
                <Foot>
                <Footer/>
                </Foot>
            </Landing1>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return { resetStore: () => dispatch(actionCreators.resetInfo())}
}

export default connect(null,mapDispatchToProps)(LandingPage);