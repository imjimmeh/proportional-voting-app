import { LoginProps } from "../base/LoginProps";

export default class LoginDTO{
    readonly Username : string;
    readonly Password: string;

    constructor(login: LoginProps){
        this.Username = login.Username;
        this.Password = login.Password;
    }
}

