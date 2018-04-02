import {ParseResult, ParseUtils} from "bryx-cereal";
import {ClientConfig, HttpClient, HttpRequest, HttpResponse, ResponseStatus} from "bryx-spoon";
import * as i18n from "i18next";
import {Weapon} from "../models/weapon";
import {Armor, ArmorSet} from "../models/armor";
import {Charm} from "../models/charm";
import {Decoration} from "../models/decoration";
import {Item} from "../models/item";
import {Skill} from "../models/skill";

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

    public static getWeapons(idOrSlug: number | string | null, callback: (result: ApiResult<Weapon[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Weapon.parse, "warn"));
        };

        MHWApi.http.get(`/weapons${idOrSlug != null ? `/${idOrSlug}` : ""}`, null, wrappedCallback);
    }

    public static getArmor(idOrSlug: number | string | null, callback: (result: ApiResult<Armor[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Armor.parse, "warn"));
        };

        MHWApi.http.get(`/armor${idOrSlug != null ? `/${idOrSlug}` : ""}`, null, wrappedCallback);
    }

    public static getArmorSets(id: number, callback: (result: ApiResult<ArmorSet[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, ArmorSet.parse, "warn"));
        };

        MHWApi.http.get(`/armor/sets${id != null ? `/${id}` : ""}`, null, wrappedCallback);
    }

    public static getCharms(idOrSlug: number | string | null, callback: (result: ApiResult<Charm[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Charm.parse, "warn"));
        };

        MHWApi.http.get(`/charms${idOrSlug != null ? `/${idOrSlug}` : ""}`, null, wrappedCallback);
    }

    public static getDecorations(idOrSlug: number | string | null, callback: (result: ApiResult<Decoration[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Decoration.parse, "warn"));
        };

        MHWApi.http.get(`/decorations${idOrSlug != null ? `/${idOrSlug}` : ""}`, null, wrappedCallback);
    }

    public static getItems(id: number | null, callback: (result: ApiResult<Item[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Item.parse, "warn"));
        };

        MHWApi.http.get(`/item${id != null ? `/${id}` : ""}`, null, wrappedCallback);
    }

    public static getSkills(idOrSlug: number | string | null, callback: (result: ApiResult<Skill[]>) => void): void {
        const wrappedCallback = (request: HttpRequest, response: HttpResponse) => {
            callback(apiArrayResultFromParse(response, Skill.parse, "warn"));
        };

        MHWApi.http.get(`/skills${idOrSlug != null ? `/${idOrSlug}` : ""}`, null, wrappedCallback);
    }
}
