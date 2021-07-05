import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '709242535333-pl44ipg3ggctlk8ko6hgji008vgbl25s.apps.googleusercontent.com'

const GooLogout = () => {
    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully ✌');
    };
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
};

export default GooLogout;