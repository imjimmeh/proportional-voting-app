import React, {
    Component, useEffect, useState
} from 'react'

import LoginComponent from '../components/loginComponent'
import TokenLoginResponse from '../models/apiResponses/AuthenticationResponse';
export default function Login(){
    const [authenticated, setAuthenticated] = useState(false);
    
    const onLoginSuccess = (response: TokenLoginResponse) => {
        const isAuthenticated = response.isSuccess && response.user != null;
        setAuthenticated(isAuthenticated);
    }

    useEffect(() => {

    });

    return(
        <LoginComponent onLoginSuccess={onLoginSuccess}/>
    )
}