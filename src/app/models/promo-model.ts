import { Rango } from "./horario-model";
import { LineaInteres_promo } from "./interest.model";

export interface Promo{
    id:Number|null;
    title:String;
    title_it:String;
    dateRange:Rango;
    description:String;
    description_it:String;
    image?:String;
    shopId:number;
    interestIds:LineaInteres_promo[];
    iiId?:Number[];

}