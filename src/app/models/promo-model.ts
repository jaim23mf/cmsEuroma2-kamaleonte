import { Rango } from "./horario-model";

export interface Promo{
    id:Number|null;
    title:String;
    dateRange:Rango;
    description:String;
    image?:String;
    shopId:number;
    interestIds:number[];
}