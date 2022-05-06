import { LoginState } from "../base/LoginState";

export default class LoginDTO{
    readonly Username : string;
    readonly Password: string;

    constructor(login: LoginState){
        this.Username = login.Username;
        this.Password = login.Password;
    }
}

