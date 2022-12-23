import { FloorSaveInfo } from "../models/floor-save-info.type"
import { RequestType } from "./request-type"

export type FloorSaveInfoRequest = {
    type: RequestType.Save,
    data: FloorSaveInfo
}