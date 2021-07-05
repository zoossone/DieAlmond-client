import React from 'react';
import styled from 'styled-components';
import LoginModal from './LoginModal';

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

const NaviBar = () => {

    return (
        <Nav>
            네비게이션 바
        </Nav>
    );
};

export default NaviBar;