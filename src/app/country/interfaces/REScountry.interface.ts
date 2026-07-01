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
    flag:    Flag;
    borders: string[];
    _match:  Match[];
    _meta:   MetaClass;
}

export interface Match {
    path:  string;
    value: string;
}

export interface MetaClass {
    lastUpdatedTimestamp: number;
}

export interface Flag {
}

export interface Names {
    common: string;
}
