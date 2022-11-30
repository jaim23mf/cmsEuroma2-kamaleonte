import { Category } from "./category-model";
import { Semana } from "./semana-model";
import { Subcategory } from "./subcat-model";

export interface Store{
    id:Number | null;
    name:String;
    type:Date | null;
    category:Category[] |null;
    subcategory:Subcategory[] | null;
    logo?:String | null;
    photo:String | null;
    op_hours:Semana;
    phone:String | null;
    //Map info;
}