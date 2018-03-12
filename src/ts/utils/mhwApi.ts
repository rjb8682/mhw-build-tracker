import {ParseResult, ParseUtils} from "bryx-cereal";
import {ClientConfig, HttpClient, HttpRequest, HttpResponse, ResponseStatus} from "bryx-spoon";
import * as i18n from "i18next";
import {Weapon} from "../models/weapon";

export type ApiResult<T> =
    { success: true, value: T } |
    { success: false, message: string, debugMessage: string | null };

export function apiSuccess<T>(value: T): ApiResult<T> {
    return { success: true, value: value };
}

export function apiFailure<T>(message: string | null, debugMessage: string | null): ApiResult<T> {
    return { success: false, message: message || i18n.t("general.genericError"), debugMessage: debugMessage };
}

function nullParser(o: any): ParseResult<null> { // tslint:disable-line:no-unused-variable
    return ParseUtils.parseSuccess(null);
}

function apiArrayResultFromParse<T>(response: HttpResponse, parseFunction: (o: any) => ParseResult<T>, failBehavior: "ignore" | "warn" | "throw"): ApiResult<T[]> {
    if (response.status == ResponseStatus.Success) {
        const itemsObject = { items: response.responseJson };
        return apiSuccess(ParseUtils.getArrayOfSubobjects(itemsObject, 'items', parseFunction, failBehavior));
    } else {
        return apiFailure<T[]>(null, `Unknown error [${response.status}]: ${response.responseJson}`);
    }
}

function apiResultFromParse<T>(response: HttpResponse, parseFunction: (o: any) => ParseResult<T>): ApiResult<T> { // tslint:disable-line:no-unused-variable
    if (response.status == ResponseStatus.Success) {
        const parseResult = parseFunction(response.responseJson);
        if (parseResult.success == true) {
            return apiSuccess(parseResult.value);
        } else {
            return apiFailure<T>(null, parseResult.justification);
        }
    } else {
        return apiFailureWithResponse<T>(response);
    }
}

function apiFailureWithResponse<T>(response: HttpResponse): ApiResult<T> { // tslint:disable-line:no-unused-variable
    return apiFailure<T>(null, `Unknown error [${response.status}]: ${response.responseJson}`);
}

export class MHWApi {
    public static readonly baseUrl: string = "https://mhw-db.com";

    private static http: HttpClient = (() => {
        const httpClientConfig: ClientConfig = {
            baseUrl: MHWApi.baseUrl,
        };

        return new HttpClient(httpClientConfig);
    })();

    public static getWeapons(callback: (result: ApiResult<Weapon[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Weapon.parse, "warn"));
        };

        MHWApi.http.get("/weapons", null, wrappedCallback);
    }
}
