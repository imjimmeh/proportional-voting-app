import UserDTO from "./UserDTO";

export default class AuthenticationResponse implements AuthenticationProps{

    constructor(props?: AuthenticationProps)
    {
        this.isAuthenticated = props?.isAuthenticated;
        this.user = props?.user;
        this.generatedToken = props?.generatedToken;
        this.responseTime = props?.responseTime ?? new Date();
        this.isSuccess = props?.isSuccess ?? false;
        this.errorMessages = props?.errorMessages;
    }

    isAuthenticated?: boolean | undefined;
    user?: UserDTO | undefined;
    generatedToken?: string;
    responseTime: Date;
    isSuccess: boolean;
    errorMessages?: ResponseError[] | undefined;
}

export type AuthenticationProps = {
    isAuthenticated?: boolean;
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