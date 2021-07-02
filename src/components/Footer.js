import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    const Foot = styled.footer`
        display: flex;
        position: absolute;
        bottom:0px;
        width: 100%;
        flex-direction: column;
        align-items: center;
        background-color: #D9E5FF;
    `;

    return (
        <Foot>
            <h3>footer부분입니다.</h3>
            <div>
                <a href="https://github.com/habasa">김성진<i class="fab fa-github-square"></i></a>
                <a href="#">박준수<i class="fab fa-github-square"></i></a><br/>
                <a href="https://github.com/creamereos">이진태<i class="fab fa-github-square"></i></a>
                <a href="https://github.com/zoossone">주상원<i class="fab fa-github-square"></i></a><br/>
            </div>
            <p>2021 DieAlmond - All rights reserved</p>
        </Foot>
    );
};

export default Footer;