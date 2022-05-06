import React, {
    Component
} from 'react'
import { Username, UsernameProps } from './username';
import { Password, PasswordProps } from './password';

export default class Login extends Component<EmptyType, UserLogin>{
    constructor(props: EmptyType)
    {
        super(props);
        this.state = {Username: "", Password: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event : React.ChangeEvent<HTMLInputElement>) {    
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    render(){
        return (
            <form>
                <Username onChangeEvent={this.handleChange}/>
                <Password onChangeEvent={this.handleChange}/>
                <button onClick={() => alert(this.state.Username + ' ' + this.state.Password)}/>
            </form>
        );
    }
}

export type UserLogin =  UsernameProps & PasswordProps;

type EmptyType = {};