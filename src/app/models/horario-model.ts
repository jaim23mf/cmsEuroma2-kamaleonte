import { FormControlOptions } from "@angular/forms";

export interface Horario{
    id:Number | null;
   dateRange:Rango,
   food:Rango,
   global:Rango,
   hypermarket:Rango,
   ourStores:Rango
}

export interface Rango{
    id:number,
    from:string,
    to:string,
    fromWeekDay?: number|null,
    toWeekDay?:number|null
}