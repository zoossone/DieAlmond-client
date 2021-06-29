import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    const Foot = styled.div`
        border: 1px solid;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    return (
        <Foot>
            <h3>footer부분입니다.</h3>
            <div>
                <a href="#">김성진<i class="fab fa-github-square"></i></a>
                <a href="#">박준수<i class="fab fa-github-square"></i></a><br/>
                <a href="#">이진태<i class="fab fa-github-square"></i></a>
                <a href="#">주상원<i class="fab fa-github-square"></i></a><br/>
            </div>
            <p>2021 DieAlmond - All rights reserved</p>
        </Foot>
    );
};

export default Footer;