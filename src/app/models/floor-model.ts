export interface Floor{
    id:Number | null;
    modelUrl: String | null;
    modelBinUrl: String ;
    name: String;
    name_it?:String;
    floor:Number;
    navPoints?:any;
    shopsNodes?:any;
}