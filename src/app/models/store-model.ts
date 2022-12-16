import { Category } from "./category-model";
import { Interest, LineaInteres_shop } from "./interest.model";
import { Opening_Day, Semana } from "./semana-model";
import { Subcategory } from "./subcat-model";

export interface Store{
    id: Number;
    title: string;
    type: Number;
    categoryId:Number; 
    subcategoryId:Number;
    logo?: string;
    photo?: string;
    openingHours: Opening_Day[],
    phoneNumber: string;
    description: string;
    firstOpeningDay: string;
    interestIds: LineaInteres_shop[];
    iiId?:Number[];
}