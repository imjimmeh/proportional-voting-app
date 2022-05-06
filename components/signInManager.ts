import LoginDTO from "./dtos/LoginDTO";
import AuthenticationManagerOptions from "./options/AuthenticationManagerProps";
import TokenLoginResponse from './dtos/AuthenticationResponse';
import StorageManager from "./StorageManager";
import { StorageType } from "../models/storage/StorageType";
import UserDTO from "./dtos/UserDTO";
export default class SignInManager
{
    private static instance?: SignInManager;
    private readonly authenticationApiUrl : string = "https://localhost:7265/";

    private readonly options?: AuthenticationManagerOptions;

    constructor(options?: AuthenticationManagerOptions)
    {
        this.options = options;
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.loginAsync = this.loginAsync.bind(this);
        this.ProcessResponseFailure = this.ProcessResponseFailure.bind(this);
    }

    static getInstance() : SignInManager{
        if(this.instance == null)
        {
            this.instance = new SignInManager();
        }

        return this.instance;
    }
    
    async loginAsync(login: LoginDTO) : Promise<TokenLoginResponse>{
        let body = JSON.stringify(login);
        let request = await fetch(this.authenticationApiUrl + "Login", {body: body, 
                                                                        method: "POST",
                                                                        headers: {
                                                                            "Content-Type": "application/json;charset=utf-8"
                                                                        }});

        this.ProcessResponseFailure(request);

        let responseBody = await request.json();
        let authenticationResponse = Object.assign(new TokenLoginResponse(), responseBody) as TokenLoginResponse;

        if(authenticationResponse.isSuccess)
        {
            await writeAuthenticationResponseToStorage(authenticationResponse);
        }

        console.log(authenticationResponse);

        return authenticationResponse;
    }

    async isAuthenticated() : Promise<boolean>{
        try{
            let user = getAuthenticationResponseFromStorage();
            return user != null && user.isAuthenticated;
        }
        catch{
            return false;
        }
    }    

    async getUser() : Promise<UserDTO | null>{
        try{
            let user = getAuthenticationResponseFromStorage();

            return (user != null && user.user != null) ? user.user : null;
        }
        catch{
            return null;
        }
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

const STORAGE_KEY  : string = "Authentication";

function getAuthenticationResponseFromStorage() : TokenLoginResponse | null 
{
    var result = StorageManager.getInstance().getItem<TokenLoginResponse>(StorageType.Local, STORAGE_KEY);

    return result;
}

async function writeAuthenticationResponseToStorage(response?: TokenLoginResponse)
{
    console.log(`writing ${response} to storage`);
    await StorageManager.getInstance().setItem(StorageType.Local, STORAGE_KEY, response);
}