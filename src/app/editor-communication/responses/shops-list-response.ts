import { ShopInfo } from "../models/shop-info.type";
import { ResponseType } from "./response-type"

export type ShopsListResponse = {
    type: ResponseType.ShopsList;
    data: ShopInfo[];
}