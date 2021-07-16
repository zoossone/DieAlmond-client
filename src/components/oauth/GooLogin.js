import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';
import styled from 'styled-components';

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
        // const auth2 = gapi.auth2.getAuthInstance();
        // auth2.disconnect()
        alert('Logout made successfully ✌');
        addUserInfo({ google: null })
        localStorage.clear()
        history.push('/')
    }

    const onFailureLogout = (res) => {
        console.log('[Logout failed] res:', res);
    }

    return (
        <div>
            {
                isLogin === false ?
                        <GoogleLogin
                        clientId={clientId}
                        buttonText='Login'
                        icon={false}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} 
                        style={{
                            width: 50,
                            height: 50
                        }}/>
                    :
                    <GoogleLogout
                        clientId={clientId}
                        icon={false}
                        isSignedIn={false} 
                        buttonText="Logout"
                        onLogoutSuccess={onLogoutSuccess}
                        onFailure={onFailureLogout}
                        style={{
                            width: 50,
                            height: 50
                        }} />
            }
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (googleToken) => dispatch(actionCreators.addInfo(googleToken)) }
}

export default connect(null, mapDispatchToProps)(GooLogin);