import React, {
    Component, EventHandler
} from 'react'

import { useRouter } from 'next/router';
import { Username } from '../components/username';
import { Password } from '../components/password';
import SignInManager from '../services/signInManager';
import { LoginState } from "../models/base/LoginState";
import { ErrorMessage } from '../models/base/errorMessage';
import TokenLoginResponse from '../models/apiResponses/AuthenticationResponse';

export default class LoginComponent extends Component<LoginProps, LoginState>{
    constructor(props: LoginProps)
    {
        super(props);
        this.state = {Username: "", Password: "", ErrorMessage: ""};
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount()
    {
        if(await SignInManager.getInstance().isAuthenticated())
        {
            console.log("User is authenticated");
        }
    }

    onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {    
        this.setState({Username: event.target.value, Password: this.state.Password, ErrorMessage: ""});
    }

    onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {    
        this.setState({Username: this.state.Username, Password: event.target.value, ErrorMessage: ""});
    }

    onErrorMessageChange(error?: string) {    
        this.setState({Username: this.state.Username, Password: this.state.Password, ErrorMessage: error});
    }

    async login(event: React.MouseEvent<any>) : Promise<void>{
        try
        {
            event.preventDefault();
            var result = await SignInManager.getInstance()
                                .loginAsync({Username: this.state.Username, Password: this.state.Password});

            if(result != null)
                this.props.onLoginSuccess(result);
        }
        catch(ex: any){
            this.onErrorMessageChange(ex);
        }
    }

    render() {
        return(
            <form>
                <Username Username={this.state.Username} onChangeEvent={this.onUsernameChange}/>
                <Password Password={this.state.Password} onChangeEvent={this.onPasswordChange}/>
                
                <div className='form-group'>
                    <button className='btn btn-primary' onClick={this.login}>
                        Login
                    </button>
                </div>

            <ErrorMessage ErrorMessage={this.state.ErrorMessage}/>
            </form>
            );
    }
}

type LoginProps = { onLoginSuccess: OnLoginSuccessFunction;}

type OnLoginSuccessFunction = {(response: TokenLoginResponse): void;};