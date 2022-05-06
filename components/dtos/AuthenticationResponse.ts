import UserDTO from "./UserDTO";

export default class AuthenticationResponse implements AuthenticationProps{

    constructor(props?: AuthenticationProps)
    {
        this.user = props?.user;
        this.generatedToken = props?.generatedToken;
        this.responseTime = props?.responseTime ?? new Date();
        this.isSuccess = props?.isSuccess ?? false;
        this.errorMessages = props?.errorMessages;

        this.isAuthenticated = this.user != null && this.isSuccess;
    }

    user?: UserDTO | undefined;
    generatedToken?: string;
    responseTime: Date;
    isSuccess: boolean;
    errorMessages?: ResponseError[] | undefined;

    isAuthenticated : boolean;
}

export type AuthenticationProps = {
    user?: UserDTO;
    generatedToken?: string;
    responseTime?: Date;
    isSuccess: boolean;
    errorMessages?: ResponseError[];
}

export class ResponseError{
    constructor(public errorMessage: string){

    }
}