import { ErrorMessageProps } from "../errorMessage";

export type LoginProps = ErrorMessageProps & { Username: string; Password: string; };
