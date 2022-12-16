import { Rango } from "./horario-model";
import { LineaInteres_promo } from "./interest.model";

export interface Promo{
    id:Number|null;
    title:String;
    dateRange:Rango;
    description:String;
    image?:String;
    shopId:number;
    interestIds:LineaInteres_promo[];
    iiId?:Number[];

}