import { Song } from "./song";

export class Playlist {
    readonly id?: string;
    readonly name: string;
    readonly songs: Song[];
}
