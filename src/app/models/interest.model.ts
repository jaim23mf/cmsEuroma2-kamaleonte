export interface Interest{
    id:Number|null;
    name:String;
    group:number | null;
}

export interface LineaInteres_shop{
    id:Number;
    id_interest:Number;
    id_shop:Number;
}

export interface LineaInteres_promo{
    id:Number;
    id_interest:Number;
    id_promo:Number;
}

export interface LineaInteres_event{
    id:Number;
    id_interest:Number;
    id_event:Number;
}