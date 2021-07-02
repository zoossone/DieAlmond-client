import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';

const clientId = '709242535333-pl44ipg3ggctlk8ko6hgji008vgbl25s.apps.googleusercontent.com'

const GooLogin = () => {
    const [token, setToken] = useState('')
    const history = useHistory()

    const onSuccess = (res) => {
        console.log(res.accessToken);
        console.log('[Login Success] currentUser:', res.profileObj);
        axios.post('https://localhost:3000/google', {
            Headers: {
                Authentication: res.accessToken
            }
        }).then((res) => {
            history.push('/mainpage')
        })
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    }

    return (
        <div>
            <GoogleLogin 
            clientId={clientId}
            buttonText='Login'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{marginTop: '100px'}}
            isSignedIn={true}
            />
        </div>
    );
};

export default GooLogin;