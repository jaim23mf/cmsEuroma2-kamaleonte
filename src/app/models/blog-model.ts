import { DateRange } from "@angular/material/datepicker";
import { Rango } from "./horario-model";

export interface BlogEntry {
    id: Number | null;
    title : String;
	title_it? : String;
	date: String;
	shortDescription?: String | null;
	shortDescription_it?: String | null;
	description?: String | null;
	description_it?: String | null;
	image?: String | null;
	thumb?: String | null;
	highlight?: Boolean | null;
}
