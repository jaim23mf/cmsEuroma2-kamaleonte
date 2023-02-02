import { Rango } from "./horario-model";
import { LineaInteres_event } from "./interest.model";

export interface Evento{
    id:Number | null;
    title:String;
    title_it:String;
    description:String;
    description_it:String;
    image:String;
    interestIds:LineaInteres_event[];
    iiId?:Number[];
    youtubeLink?:String;
    dateRange:Rango;
}