import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyBucketListPage from './MyBucketListPage';
import styled from 'styled-components';

const BackButton = styled.button`
    border-radius: 4px;
    margin: 10px;
    width: 80px;
    height: 30px;
`;

const Nav = styled.nav`
    background-color: #ffc93c;
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