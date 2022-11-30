export interface BlogEntry {
    id: Number | null;
    title : String;
	date: Date;
	short_desc?: String | null;
	description?: String | null;
	image?: String | null;
	thumb?: String | null;
	highlight?: String | null;
}
