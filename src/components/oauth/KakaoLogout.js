import React from 'react';

const KakaoLogout = () => {

    const KakaoOut = () => {
        if (window.Kakao.Auth.getAccessToken()) {
            // 로그인할때 받아온 토큰값이 있으면
            console.log("카카오 인증 엑세스 토큰 존재", window.Kakao.Auth.getAccessToken());
            window.Kakao.Auth.logout(() => {
                console.log("카카오 로그아웃 완료", window.Kakao.Auth.getAccessToken());
            })
        }
    }
    return (
        <div>
            <button onClick={KakaoOut}>카카오 로그아웃</button>
        </div>
    );
};

export default KakaoLogout;