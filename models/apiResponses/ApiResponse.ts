import { ResponseError } from "./ResponseError";

export type ApiResponse ={
    isSuccess : boolean;
    responseTime: Date;
    errorMessages?: ResponseError[]
}