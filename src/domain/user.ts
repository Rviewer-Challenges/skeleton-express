import { Playlist } from "./playlist";

export class User {
    readonly id: string;
    readonly username: string;
    readonly password: string;
    readonly playlists: Playlist[]
}
