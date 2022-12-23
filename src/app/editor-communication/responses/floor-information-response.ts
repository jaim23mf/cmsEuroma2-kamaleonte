import { FloorInfo } from "../models/floor-info.type"
import { ResponseType } from "./response-type"

export type FloorInformationResponse = {
    type: ResponseType.FloorInformation,
    data: FloorInfo
}