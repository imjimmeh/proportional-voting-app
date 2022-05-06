import { FC, useState } from "react";

export const ErrorMessage : FC<ErrorMessageProps> = (props? : ErrorMessageProps) => {
    const[errorMessage, setErrorMessage] = useState("");

    if(errorMessage == null)
    {
        return <div></div>
    }
    else
    {
    return(
        <div>{errorMessage}</div>
    )
    }
};

export type ErrorMessageProps = { ErrorMessage?: string };

