import { ApiResponse } from "../models/apiResponses/ApiResponse";

const CONTENT_TYPE_JSON = "application/json;charset=utf-8";
const METHOD_POST = "POST";
const METHOD_GET = 'GET';

export default class httpService {

    constructor(private options?: HttpServiceOptions) {
        this.postJson = this.postJson.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.checkResponseForFailure = this.checkResponseForFailure.bind(this);
    }

    ///Posts the given body as JSON to the specified URL, and returns the response as expected class if successful
    async postJson<T extends ApiResponse>(url: string, body: any, constructor: { new(): T; }): Promise<T> {
        let jsonBody = JSON.stringify(body);

        let response = await fetch(this.getUrl(url), {
            body: jsonBody,
            method: METHOD_POST,
            headers: {
                'Content-Type': CONTENT_TYPE_JSON
            }
        });

        return await this.ProcessApiResponse<T>(response, constructor);
    }

    ///Gets the response at the given URL, and returns the resposne (if successful) as expected class
    async getJson<T extends ApiResponse>(url: string, constructor: { new(): T; }): Promise<T> {
        let response = await fetch(this.getUrl(url), {
            method: METHOD_GET,
            headers: {
                'Content-Type': CONTENT_TYPE_JSON
            }
        });

        return await this.ProcessApiResponse<T>(response, constructor);
    }

    private async ProcessApiResponse<T extends ApiResponse>(response: Response, constructor: new () => T) {
        let responseBody = await response.json();
        let responseCheck = this.checkResponseForFailure(response);

        if (!responseCheck.isSuccess) {
            throw responseCheck.errorMessage;
        }

        return Object.assign(new constructor(), responseBody) as T;
    }

    private getUrl(url: string) : string {
        return this.options?.baseUrlAddress != null ? this.options?.baseUrlAddress + url : url;
    }

    private checkResponseForFailure(response: Response): ApiFailureResponse {
        if (!response.ok) {
            if (response.status === 401 || response.status === 403)
                return { isSuccess: false, statusCode: response.status, errorMessage: 'Could not authenticate you; please double check your username and password' }

            else
                return { isSuccess: false, statusCode: response.status, errorMessage: 'Unknown error authenticating; please try again' }
        }

        return { isSuccess: true, statusCode: response.status };



    }
}

type ApiFailureResponse = { isSuccess: boolean; errorMessage?: string; statusCode: number; }

type HttpServiceOptions = { baseUrlAddress?: string; }