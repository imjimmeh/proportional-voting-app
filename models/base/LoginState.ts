import { ErrorMessageProps } from "./errorMessage";

export type LoginState = ErrorMessageProps & { Username: string; Password: string; };
