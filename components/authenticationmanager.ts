import LoginDTO from "./dtos/LoginDTO";
import AuthenticationManagerOptions from "./options/AuthenticationManagerProps";
import AuthenticationResponse from './dtos/AuthenticationResponse';

export default class AuthenticationManager
{
    private static instance?: AuthenticationManager;
    private readonly authenticationApiUrl : string = "https://localhost:7265/";

    private readonly options?: AuthenticationManagerOptions;

    constructor(options?: AuthenticationManagerOptions)
    {
        this.options = options;
    }

    static getInstance() : AuthenticationManager{
        if(this.instance == null)
        {
            this.instance = new AuthenticationManager();
        }

        return this.instance;
    }
    
    async loginAsync(login: LoginDTO) : Promise<AuthenticationResponse>{
        let body = JSON.stringify(login);
        let request = await fetch(this.authenticationApiUrl + "Login", {body: body, 
                                                                        method: "POST",
                                                                        headers: {
                                                                            "Content-Type": "application/json;charset=utf-8"
                                                                        }});

        this.ProcessResponseFailure(request);

        let responseBody = await request.json();
        let authenticationResponse = Object.assign(new AuthenticationResponse(), responseBody) as AuthenticationResponse;

        return authenticationResponse;
    }

    private ProcessResponseFailure(request: Response) {
        if (!request.ok) {
            if (request.status === 401 || request.status === 403)
                throw 'Could not authenticate you; please double check your username and password';

            else
                throw 'Unknown error authenticating; please try again';
        }
    }
}
