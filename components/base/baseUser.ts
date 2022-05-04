export default class BaseUser{
    Username: string;
    CreatedAt: Date;
    
    constructor(username: string, createdAt?: Date){
        this.Username = username;
        this.CreatedAt = createdAt ?? new Date();
    }
}