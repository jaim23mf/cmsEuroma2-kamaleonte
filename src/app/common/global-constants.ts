export class GlobalConstants {

    public static api: string = "https://localhost:7260";  

}

export function setLocalTime(fecha:string){
    let date = new Date(fecha);
    
    let anno = date.getFullYear();
    let mes = date.getMonth()+1;
    let mesA = mes.toString();

    let dia = date.getDate();
    let diaA = dia.toString();
    if (mes < 10){
        mesA = "0"+mes;
    }
    if(dia<10){
        diaA = "0"+dia;
    }
    return anno+"-"+mesA+"-"+diaA;
}