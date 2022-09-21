import { Playlist } from '../domain/playlist';
import { Song } from '../domain/song';
import { User } from '../domain/user';
import { v4 as uuidv4 } from 'uuid';

const userDatabase = require('../../data/users.json');

export class UserService {

    static async authenticate({ username, password }): Promise<any> {

        const user = await userDatabase.find((user) => user.name === username && user.password === password);

        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }

    async getUserById(currentUser: string, id: string): Promise<User> {
        if (currentUser !== id) return { code: 401, message: 'You are not authorized.' } as any;

        const user = await userDatabase.find((user) => user.id === id);
        if (!user) return { code: 401, message: "User not found with this id" } as any;

        return user;
    };

    async getPlaylists(user: User): Promise<Playlist[]> {
        return await user.playlists;
    }

    async getPlaylistById(user: User, listId, currentUser?: string): Promise<Playlist> {
        const playlist = await user.playlists.find((pl) => pl.id === listId);
        if (!playlist) return { code: 401, message: `User has no playlist with id ${listId}` } as any

        return playlist;
    }

    async createNewPlaylist(user: User, playlist: Playlist): Promise<User> {
        const newPlaylist: Playlist = { id: uuidv4, ...playlist }
        await user.playlists.push(newPlaylist);

        return user;
    }

    async addSongToList(user: User, listId: string, song: Song): Promise<Playlist> {
        const playlist = user.playlists.find((pl) => pl.id === listId);
        if (!playlist) return { code: 401, message: `User has no playlist with id ${listId}` } as any

        const newSong: Song = { ...song }

        playlist.songs.push(newSong);

        return playlist;
    }
}