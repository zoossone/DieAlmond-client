import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = '709242535333-pl44ipg3ggctlk8ko6hgji008vgbl25s.apps.googleusercontent.com'

const GooLogin = () => {
    const onSuccess = (res) => {
        console.log(res);
        console.log('[Login Success] currentUser:', res.profileObj);
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