import LoginDTO from "../models/dtos/LoginDTO";
import AuthenticationManagerOptions from "../components/options/AuthenticationManagerProps";
import TokenLoginResponse from '../models/apiResponses/AuthenticationResponse';
import StorageManager from "./StorageManager";
import { StorageType } from "../models/storage/StorageType";
import UserDTO from "../models/dtos/UserDTO";
import HttpService from "./httpService";

export default class SignInManager {
    private static instance?: SignInManager;
    private readonly authenticationApiUrl: string = "https://localhost:7265/";
    private readonly httpService: HttpService;

    constructor(private readonly options?: AuthenticationManagerOptions) {
        this.options = options;
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.loginAsync = this.loginAsync.bind(this);

        this.httpService = new HttpService({ baseUrlAddress: this.authenticationApiUrl });
    }

    static getInstance(): SignInManager {
        if (this.instance == null) {
            this.instance = new SignInManager();
        }

        return this.instance;
    }

    async loginAsync(login: LoginDTO): Promise<TokenLoginResponse> {
        var response = await this.httpService.postJson("Login", login, TokenLoginResponse);

        if (response.isSuccess) {
            writeAuthenticationResponseToStorage(response);
        }

        return response;
    }

    async isAuthenticated(): Promise<boolean> {
        try {
            let user = getAuthenticationResponseFromStorage();
            return user != null && user.isAuthenticated;
        }
        catch {
            return false;
        }
    }

    async getUser(): Promise<UserDTO | null> {
        try {
            let user = getAuthenticationResponseFromStorage();

            return (user != null && user.user != null) ? user.user : null;
        }
        catch {
            return null;
        }
    }
}

const STORAGE_KEY: string = "Authentication";

function getAuthenticationResponseFromStorage(): TokenLoginResponse | null {
    var result = StorageManager.getInstance().getItem<TokenLoginResponse>(StorageType.Local, STORAGE_KEY);

    return result;
}

async function writeAuthenticationResponseToStorage(response?: TokenLoginResponse) {
    await StorageManager.getInstance().setItem(StorageType.Local, STORAGE_KEY, response);
}