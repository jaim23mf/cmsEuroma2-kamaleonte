export interface Semana{
    Mon:Dia;
    Tue:Dia;
    Wed:Dia;
    Thu:Dia;
    Fri:Dia;
    Sat:Dia;
    Sun:Dia;
}


export interface Dia{
    inicio:String;
    fin:String;
}

export class Semana implements Semana{
    constructor(){
        this.Mon = {inicio:"00:00",fin:"00:00"};
        this.Tue = {inicio:"00:00",fin:"00:00"};
        this.Wed = {inicio:"00:00",fin:"00:00"};
        this.Thu = {inicio:"00:00",fin:"00:00"};
        this.Fri = {inicio:"00:00",fin:"00:00"};
        this.Sat = {inicio:"00:00",fin:"00:00"};
        this.Sun = {inicio:"00:00",fin:"00:00"};
    }

}

export interface Opening_Day{
    id: Number;
    description: Number;
    from: string;
    to: string;
    id_shop?:Number;
}