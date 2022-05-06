import React, {
    Component
} from 'react'
import { Username } from './username';
import { Password } from './password';
import SignInManager from './signInManager';
import { LoginProps } from "./base/LoginProps";
import { ErrorMessage } from './errorMessage';

export default class Login extends Component<EmptyType, LoginProps>{
    constructor(props: EmptyType)
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
            alert("User is authenticated");
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
            await SignInManager.getInstance()
                                .loginAsync({Username: this.state.Username, Password: this.state.Password});
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

               <ErrorMessage ErrorMessage={this.state.ErrorMessage}/>
            </form>
        );
    }
}

type EmptyType = {};