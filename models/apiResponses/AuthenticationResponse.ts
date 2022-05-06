import UserDTO from "../dtos/UserDTO";
import { ResponseError } from "./ResponseError";
import { ApiResponse } from "./ApiResponse";
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
    errorMessages?: ResponseError[];
    isAuthenticated : boolean;
}

export interface AuthenticationProps extends ApiResponse {
    user?: UserDTO;
    generatedToken?: string;
}

