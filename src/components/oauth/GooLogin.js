import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';
import styled from 'styled-components';

const Button = styled.div`
    margin-right: 20px;
    border-radius: 4px;
    background-color: pink;
    border: outset 2px pink;
    color: white;
    cursor: pointer;
    width: 60px;
    height: 40px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    border-radius: 50px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    text-align: center;
    padding-top: 10px;
    
    &:hover {
        border: inset 2px white;
        color: pink;
        background-color: white;
    }
`

const clientId = '709242535333-pl44ipg3ggctlk8ko6hgji008vgbl25s.apps.googleusercontent.com'

const Div = styled.div`
        osition: absolute;
        eft: 50%;
        op: 50%;
        -index: 1;
        idth: 120px;
        eight: 120px;
        argin: 80px 0 0 -76px;
        ont-weight: bold;
`

const Loader = styled.div`
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: -76px 0 0 -76px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #35A88E;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
`

const GooLogin = ({ addUserInfo }) => {
    const [token, setToken] = useState('')
    const [isLogin, setIslogin] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    const onSuccess = (res) => {
        console.log(res)
        if(res.accessToken) {
            console.log(res.accessToken);
            console.log('[Login Success] currentUser:', res.profileObj);
            axios.post('http://localhost:80/google',{
              
            }, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${res.accessToken}`
                }, withCredentials: true
            },
            ).then((res) => {
                setIslogin(!isLogin)
                const realToken = res.data.access_token
                addUserInfo({ google: realToken.slice(7) })
                localStorage.setItem("isLogin", "login");
                history.push('/main')
            }).catch((e) => alert(e))
        }
    }


    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    }

    const onLogoutSuccess = (res) => {
        console.log('Logout made successfully');
        alert('로그아웃이 완료되었습니다!');
        setIslogin(!isLogin)
        addUserInfo({ google: null })
        localStorage.clear()
        history.push('/')
    }

    const onFailureLogout = (res) => {
        console.log('[Logout failed] res:', res);
    }

    return (
        <>
            {
                isLogin === false ?
                        <GoogleLogin
                        clientId={clientId}
                        // buttonText='로그인'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} 
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>로그인</Button>
                          )}
                        />
                    :
                    <GoogleLogout
                        clientId={clientId}
                        icon={false}
                        // buttonText="로그아웃"
                        onLogoutSuccess={onLogoutSuccess}
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>로그아웃</Button>
                          )}
                        // style={{
                        //     width: 50,
                        //     height: 50
                        // }} 
                        />
            }
        </>
    );
};

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (googleToken) => dispatch(actionCreators.addInfo(googleToken)) }
}

export default connect(null, mapDispatchToProps)(GooLogin);