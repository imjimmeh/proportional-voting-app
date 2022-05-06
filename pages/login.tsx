import { useRouter } from 'next/router';
import React, {
    Component, useEffect, useState
} from 'react'

import LoginComponent from '../components/loginComponent'
import TokenLoginResponse from '../models/apiResponses/AuthenticationResponse';

export default function Login(){
    let router = useRouter();

    const [authenticated, setAuthenticated] = useState(false);
    
    const onLoginSuccess = (response: TokenLoginResponse) => {
        const isAuthenticated = response != null && response.isSuccess && response.user != null;
        setAuthenticated(isAuthenticated);
    }

    useEffect(() => {
        if(authenticated){
            router.push("/votes");
        }
    
    });

    return(
        <LoginComponent onLoginSuccess={onLoginSuccess}/>
    )
}