import { Playlist } from '../domain/playlist';
import { Song } from '../domain/song';
import { User } from '../domain/user';
import { v4 as uuidv4 } from 'uuid';

const userDatabase = require('../../data/users.json');

export class UserService {

    static authenticate({ username, password }) {

        const user = userDatabase.find((user) => user.name === username && user.password === password);

        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }

    // getUserById(currentUser: string, id: string): User {
    //     if (currentUser !== id) return { code: 401, message: 'You are not authorized.' } as any;

    //     const user = userDatabase.find((user) => user.id === id);

    //     if (!user) return { code: 401, message: "User not found with this id" } as any;

    //     return user;
    // }

    getPlaylists(currentUser: string, id: string): Playlist[] {
        if (currentUser !== id) return { code: 401, message: 'You are not authorized.' } as any;

        const user = userDatabase.find((user) => user.id === id);
        if (!user) return { code: 401, message: "User not found with this id" } as any;

        return user.playlists;
    }

    getPlaylistById(userId: string, listId, currentUser?: string): Playlist {
        if (currentUser !== userId) return { code: 401, message: 'You are not authorized.' } as any;

        const user = userDatabase.find((user) => user.id === userId);
        if (!user) return { code: 401, message: "User not found with this id" } as any;

        const playlist = user.playlists.find((pl) => pl.id === listId);
        if (!playlist) return { code: 401, message: `User has no playlist with id ${listId}` } as any

        return playlist;

    }

    createNewPlaylist(currentUser: string, userId: string, playlist: Playlist): User {
        if (currentUser !== userId) return { code: 401, message: 'You are not authorized.' } as any;

        const user = userDatabase.find((user) => user.id === userId);
        if (!user) return { code: 401, message: "User not found with this id" } as any;

        const newPlaylist: Playlist = { id: uuidv4, ...playlist }
        user.playlists.push(newPlaylist);

        return user;
    }

    addSongToList(currentUser: string, userId: string, listId: string, song: Song): Playlist {
        if (currentUser !== userId) return { code: 401, message: 'You are not authorized.' } as any;

        const user = userDatabase.find((user) => user.id === userId);
        if (!user) return { code: 401, message: "User not found with this id" } as any;

        const playlist = user.playlists.find((pl) => pl.id === listId);
        if (!playlist) return { code: 401, message: `User has no playlist with id ${listId}` } as any

        const newSong: Song = { ...song }

        playlist.songs.push(newSong);

        return playlist;
    }
}