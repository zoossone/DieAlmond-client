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
border: 1px solid black;
`;
const NavBtn = styled.button`
width: auto;
height: 30px;
`;

const NaviBar = ({userInfo}) => {
    const history = useHistory()

    const memberOnly = () => {
        if(userInfo.google || userInfo.kakao) {
            history.push('/bucket')
        } else if(window.confirm('로그인하실래요?'))  {
            history.push('/')
        }
    }

    return (
        <Nav>
            <button onClick={memberOnly}>my bucket</button>
            {userInfo.google ? <GooLogin/> : null}
            {userInfo.kakao ? <KakaoLogin/> : null}
            {/* {!userInfo.google && !userInfo.kakao ? <><GooLogin/><KakaoLogin/></> : null} */}
            <button onClick={() => {
                history.push('/mymy')
            }}>setting</button>
        </Nav>
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

export default connect(mapStateToProps)(NaviBar);