import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyBucketListPage from './MyBucketListPage';
import styled from 'styled-components';

const BackButton = styled.button`
    -webkit-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    -moz-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    max-width: 180px;
    text-decoration: none;
    border-radius: 4px;
    padding: 10px 30px;
    margin: 10px;

    :hover {
        color: rgba(255, 255, 255, 0.85);
	box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
    }
`;

const Nav = styled.nav`
    display: flex;
    background-color: #ffc93c;
    flex-direction: row-reverse;
`;

const BucketListPage = () => {
    const history = useHistory()
    
    return (
        <div>
            <Nav>
                <BackButton onClick={() => history.push('/main')}>Back</BackButton>
            </Nav>
            <MyBucketListPage />
        </div>
    );
};

export default BucketListPage;