import LoginDTO from "../components/dtos/LoginDTO";
import AuthenticationManagerOptions from "../components/options/AuthenticationManagerProps";
import AuthenticationResponse from '../components/dtos/AuthenticationResponse';

export default class AuthenticationManager
{
    options: AuthenticationManagerOptions

    constructor(options: AuthenticationManagerOptions)
    {
        this.options = options;
    }

    async loginAsync(login: LoginDTO) : Promise<AuthenticationResponse>{
        let request = await fetch("/Token",{body: ""});

        if(!request.ok)
        {
            return new AuthenticationResponse(false, null);
        }

        let responseBody = await request.json();

        let response = JSON.parse(responseBody);

        let authenticationResponse = Object.assign(new AuthenticationResponse(false, null), response) as AuthenticationResponse;

        return authenticationResponse;

    }
}
