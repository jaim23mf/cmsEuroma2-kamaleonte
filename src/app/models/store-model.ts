import { Category } from "./category-model";
import { Opening_Day, Semana } from "./semana-model";
import { Subcategory } from "./subcat-model";

export interface Store{
    id: Number;
    title: string;
    type: Number;
    categoryId:Category[]; 
    subcategoryId:Subcategory[];
    logo?: string;
    photo?: string;
    openingHours: Opening_Day[],
    phoneNumber: string;
    description: string;
    firstOpeningDay: string;
    interestIds: Number[];
}