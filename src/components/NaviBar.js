import React from 'react';
import styled from 'styled-components';

const NaviBar = () => {
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

    return (
        <Nav>
        </Nav>
    );
};

export default NaviBar;