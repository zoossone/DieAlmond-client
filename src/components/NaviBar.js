import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import GooLogin from './oauth/GooLogin';
import KakaoLogin from './oauth/KakaoLogin';
import {connect} from 'react-redux';

const Nav = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 60px;
    padding: 10px;
`;

const BucketBtn = styled.button`
    margin-right: 20px;
    border-radius: 10px;
    background-color: pink;
    border: outset 2px pink;
    color: white;
    cursor: pointer;
    width: 150px;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;

    -webkit-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    -moz-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    max-width: 120px;
    border-radius: 4px;
    
    &:hover {
        border: inset 2px pink;
        color: pink;
        background-color: white;
        box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
    }
`;

const SettingBtn = styled.button`
    margin-right: 20px;
    border-radius: 4px;
    background-color: pink;
    border: outset 2px pink;
    color: white;
    cursor: pointer;
    width: 60px;
    height: 40px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    border-radius: 50px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    
    &:hover {
        border: inset 2px white;
        color: pink;
        background-color: white;
    }
`;

const NaviBar = ({userInfo}) => {
    const history = useHistory()

    const memberOnly = () => {
        if(userInfo.snsLogin || userInfo.kakao) {
            history.push('/bucket')
        } else if(window.confirm('로그인 / 회원가입 해야합니다.'))  {
            history.push('/')
        }
    }

    return (
        <>
            {/* <BucketBtn onClick={memberOnly}>버킷리스트 페이지</BucketBtn> */}
            <Nav>
                {userInfo.snsLogin ? <GooLogin/> : null}
                {/* {userInfo.kakao ? <KakaoLogin/> : null} */}
                {/* {!userInfo.google && !userInfo.kakao ? <><GooLogin/><KakaoLogin/></> : null} */}

                <SettingBtn onClick={() => {
                    history.push('/mymy')
                }}>설정</SettingBtn>
            </Nav>          
        </>
        
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

export default connect(mapStateToProps)(NaviBar);