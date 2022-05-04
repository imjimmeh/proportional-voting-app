export default class LoginDTO{
    Username: Readonly<string>;
    Password: Readonly<string>;

    constructor(username: string, password: string){
        this.Username = username;
        this.Password = password;
    }
}