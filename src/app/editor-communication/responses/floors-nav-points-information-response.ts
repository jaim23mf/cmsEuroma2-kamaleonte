import { FloorNavPointsInfo } from "../models/floor-nav-points-info.type"
import { ResponseType } from "./response-type"

export type FloorsNavPointsInformationResponse = {
    type: ResponseType.FloorsNavPointsInfo,
    data: FloorNavPointsInfo[]
}