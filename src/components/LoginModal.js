import React, { useState } from 'react';
import styled from 'styled-components';
import GooLogin from './oauth/GooLogin';
import KakaoLogin from './oauth/KakaoLogin';

const Modalcontainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: #00000080;
`;

const Modal = styled.span`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
position: fixed;
width: 180px;
height: 300px;
background: white;
border-radius: 4px;
border: 4px solid #db7093;
`;

const Div = styled.div`
color: #db7093;
`

const LoginModal = (props) => {

    return (
            <Modalcontainer onClick={() => props.handleLoginModal()}>
                <Modal onClick={(e) => e.stopPropagation()}>
                    <Div>로그인/회원가입</Div>
                <GooLogin />
                </Modal>
            </Modalcontainer>
    );
};

export default LoginModal;