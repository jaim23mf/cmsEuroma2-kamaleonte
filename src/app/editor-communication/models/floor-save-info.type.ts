import { FloorNavPoint } from "./floor-nav-point.type";
import { FloorShop } from "./floor-shop.type";

export interface FloorSaveInfo{
    navPoints: FloorNavPoint[];
    shopsNodes: FloorShop[];
}