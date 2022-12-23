import { FloorInformationRequest } from "./floor-information-request";
import { FloorSaveInfoRequest } from "./floor-save-info-request";
import { FloorsNavPointsInformationRequest } from "./floors-nav-points-information-request";
import { ShopsListRequest } from "./shops-list-request";

export type EditorRequest = FloorInformationRequest | FloorSaveInfoRequest | FloorsNavPointsInformationRequest | ShopsListRequest;