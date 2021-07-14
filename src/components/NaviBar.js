import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import GooLogin from './oauth/GooLogin';
import KakaoLogin from './oauth/KakaoLogin';
import {connect} from 'react-redux';

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: #9ddfd3;
    padding: 10px;
`;

const BucketBtn = styled.button`
    -webkit-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    -moz-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    max-width: 120px;
    border-radius: 4px;
    
    :hover {
        color: rgba(255, 255, 255, 0.85);
        box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
    }
`;

const SettingBtn = styled.button`
    -webkit-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    -moz-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    max-width: 120px;
    border-radius: 4px;
    
    :hover {
        color: rgba(255, 255, 255, 0.85);
        box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
}
`;

const NaviBar = ({userInfo}) => {
    const history = useHistory()

    const memberOnly = () => {
        if(userInfo.snsLogin || userInfo.kakao) {
            history.push('/bucket')
        } else if(window.confirm('로그인하실래요?'))  {
            history.push('/')
        }
    }

    return (
        <Nav>
            <BucketBtn onClick={memberOnly}>my bucket</BucketBtn>
            {userInfo.snsLogin ? <GooLogin/> : null}
            {/* {userInfo.kakao ? <KakaoLogin/> : null} */}
            {/* {!userInfo.google && !userInfo.kakao ? <><GooLogin/><KakaoLogin/></> : null} */}
            <SettingBtn onClick={() => {
                history.push('/mymy')
            }}>setting</SettingBtn>
        </Nav>
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

export default connect(mapStateToProps)(NaviBar);