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
    console.log(userInfo);
    return (
        <Nav>
            <button onClick={() => {
                history.push('/bucket')
            }}>my bucket</button>
            {userInfo.google ? <GooLogin/> : <KakaoLogin/>}
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