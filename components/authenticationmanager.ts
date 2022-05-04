import LoginDTO from "./dtos/LoginDTO";
import AuthenticationManagerOptions from "./options/AuthenticationManagerProps";

export default class AuthenticationManager
{
    options: AuthenticationManagerOptions

    constructor(options: AuthenticationManagerOptions)
    {
        this.options = options;
    }

    loginAsync(login: LoginDTO){
        
    }
}