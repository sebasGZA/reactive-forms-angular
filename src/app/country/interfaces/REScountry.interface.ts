export interface RESCountryResponse {
    data: CountryResponse;
}

export interface CountryResponse {
    objects: Country[];
    meta:    Meta;
}

export interface Meta {
    total:      number;
    count:      number;
    limit:      number;
    offset:     number;
    more:       boolean;
    request_id: string;
    duration:   number;
}

export interface Country {
    names:   Names;
    codes:   Codes;
    flag:    Flag;
    borders: string[];
    _match:  Match[];
    _meta:   MetaClass;
}

export interface Match {
    path:  Path;
    value: Value;
}

export enum Path {
    Region = "region",
}

export enum Value {
    Americas = "Americas",
}

export interface MetaClass {
    lastUpdatedTimestamp: number;
}

export interface Codes {
    alpha_2: string;
}

export interface Flag {
    emoji: string;
}

export interface Names {
    common: string;
}
