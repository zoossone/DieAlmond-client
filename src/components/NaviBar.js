import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
    const history = useHistory()

    return (
        <Nav>
            <button onClick={() => {
                history.push('/bucket')
            }}>my bucket</button>
            <button onClick={() => {
                history.push('/mymy')
            }}>setting</button>
        </Nav>
    );
};

export default NaviBar;