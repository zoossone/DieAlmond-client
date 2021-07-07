import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import KakaoLogin from './KakaoLogin';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';

const clientId = '709242535333-pl44ipg3ggctlk8ko6hgji008vgbl25s.apps.googleusercontent.com'

const GooLogin = ({ addUserInfo }) => {
    const [token, setToken] = useState('')
    const [isLogin, setIslogin] = useState(false)
    const history = useHistory()

    const onSuccess = (res) => {
        console.log('토큰:', res)
        console.log(res.accessToken)
        if (res.accessToken) {
            console.log(res.accessToken);
            console.log('[Login Success] currentUser:', res.profileObj);

            axios.post('http://localhost:80/google',{
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${res.accessToken}`
                },
                withCredentials: true
            }).then((res) => {
                setIslogin(!isLogin)
                setToken(res.accessToken)
                addUserInfo({ google: res.accessToken })
                history.push('/main')
            }).catch((e) => alert(e))
        }
    }

    const onLogoutSuccess = (res) => {
        console.log(res);
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');
        setIslogin(!isLogin)
        addUserInfo({ google: null })
        history.push('/')
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    }

    // 구글 로그인되있으면 구글 로그아웃버튼
    // 카카오로 들어갔으면 카카오 로그아웃버튼 뜨게

    return (
        <div>
            {
                isLogin === false ?
                    <GoogleLogin
                        clientId={clientId}
                        buttonText='Login'
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} />
                    :
                    <GoogleLogout
                        clientId={clientId}
                        icon={false}
                        buttonText="Logout"
                        onLogoutSuccess={onLogoutSuccess}
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