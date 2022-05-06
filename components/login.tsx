import React, {
    Component
} from 'react'
import { Username } from './username';
import { Password } from './password';
import AuthenticationManager from './authenticationmanager';
import { LoginProps } from "./base/LoginProps";
import StorageManager from './StorageManager';
import { StorageType } from '../models/storage/StorageType';

export default class Login extends Component<EmptyType, LoginProps>{
    constructor(props: EmptyType)
    {
        super(props);
        this.state = {Username: "", Password: "", ErrorMessage: ""};
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
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
            alert(this.state.Username + " " + this.state.Password);
            let authenticationResult = await AuthenticationManager.getInstance()
                                .loginAsync({Username: this.state.Username, Password: this.state.Password});

            if(authenticationResult.isSuccess)
            {
                await StorageManager.getInstance().setItem(StorageType.Local, "RefreshToken", authenticationResult.generatedToken);
            }
        }
        catch(ex: any){
            this.onErrorMessageChange(ex);
        }
    }

    render(){
        return (
            <form>
                <Username Username={this.state.Username} onChangeEvent={this.onUsernameChange}/>
                <Password Password={this.state.Password} onChangeEvent={this.onPasswordChange}/>
                
                <div className='form-group'>
                    <button className='btn btn-primary' onClick={this.login}>
                        Login
                    </button>
                </div>

                <div>
                    <div>{this.state.ErrorMessage}</div>
                </div>
            </form>
        );
    }
}

type EmptyType = {};