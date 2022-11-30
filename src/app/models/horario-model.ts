
export interface Horario{
    id:Number | null;
    tipo:"global" | "food" | "market" | "stores" | null;
    diaInicio:Date;
    diaFin?:Date;
    horaInicio:String | null;
    horaFin:String | null;
}