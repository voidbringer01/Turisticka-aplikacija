import { Ocena } from "./ocena";
import { Vaznost } from "./vaznost";

export interface Znamenitost{
    id?:number;
    idOpstine?:string;
    naziv:string;
    opis:string;
    slike:string[];
    koordinate:{id?:number,lat:string,lon:string},
    vaznost:Vaznost;
    aktivna?:boolean;
    ocene?:Ocena[];
}
