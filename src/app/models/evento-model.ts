export interface Evento{
    id:Number | null;
    titulo:String;
    diaInicio:Date | null;
    diaFin:Date |null;
    descripcion:String;
    imagen?:String;
    categoria:String;
}