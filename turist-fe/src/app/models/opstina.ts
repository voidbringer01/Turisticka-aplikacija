import { Znamenitost } from "./znamenitost";

export interface Opstina{
    id:number;
    idDrzave?:string;
    nazivOpstine:string;
    znamenitosti:Znamenitost[];
}