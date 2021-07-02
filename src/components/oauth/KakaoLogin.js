import React, { useState } from 'react';

const { Kakao } = window

const KakaoLogin = () => {
    const [data, setData] = useState('') // 요청한 유저 데이터값 저장 위해서

    const KakaoLog = () => {
        window.Kakao.Auth.login({
            scope: 'profile_nickname, account_email, gender',
            success: function (authObj) {
                console.log(authObj);
                window.Kakao.API.request({
                    url: '/v2/user/me', // 로그인한 사용자의 정보 가져옴
                    success: res => {
                        const Kakao_account = res.kakao_account
                        setData(Kakao_account)
                        console.log(Kakao_account);
                    }
                })
            }
        })
    }

    return (
        <div>
            <button onClick={KakaoLog}>카카오로그인</button>
        </div>
    );
};

export default KakaoLogin;