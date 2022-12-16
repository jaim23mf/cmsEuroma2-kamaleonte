import { Rango } from "./horario-model";
import { LineaInteres_event } from "./interest.model";

export interface Evento{
    id:Number | null;
    title:String;
    description:String;
    image:String;
    interestIds:LineaInteres_event[];
    iiId?:Number[];
    dateRange:Rango;
}