import UserDTO from "./UserDTO";

export default class AuthenticationResponse{
    constructor(public isAuthenticated: boolean, public user?: UserDTO)
    {
        
    }
}