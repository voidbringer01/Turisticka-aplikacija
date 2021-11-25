export interface Znamenitost{
    id:string;
    idOpstine:string;
    naziv:string;
    opis:string;
    slike:string[];
    koordinate:{lat:string,lon:string},
    vaznost:string;
    aktivnost?:boolean;
}