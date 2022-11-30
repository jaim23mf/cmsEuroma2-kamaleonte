export interface Promo{
    id:Number|null;
    titulo:String;
    diaInicio:Date | null;
    diaFin:Date |null;
    descripcion:String;
    imagen?:String;
    store:String;
}