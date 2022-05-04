import React, {
    Component
} from 'react'

import Username from './username';
import Password from './password';

export default class Login extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = { username:'', password: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {    
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    render(){
        return (
            <form>
                <Username value={this.state.username} handleChange={this.handleChange}/>
                <Password value={this.state.password} handleChange={this.handleChange}/>
                <button onClick={() => alert(this.state.username + ' ' + this.state.password)}/>
            </form>
        );
    }
}