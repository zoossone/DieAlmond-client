import React from 'react';
import { GoogleLogout } from 'react-google-login';
import KakaoLogout from '../components/oauth/KakaoLogout'
import GooLogout from '../components/oauth/GooLogout'

const MainPage = () => {
    return (
        <div>
            메인페이지입니다.
            <GooLogout />
            <KakaoLogout/>
        </div>
    );
};

export default MainPage;