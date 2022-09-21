import { Login } from '../domain/login';
import { Playlist } from '../domain/playlist';
import { Song } from '../domain/song';
import { User } from '../domain/user';

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var uuid = require('uuid');

const userDatabase = require('../../data/users.json');

export class UserService {

    login(login: Login): any {
        const { username, password } = login;

        const user = userDatabase.find((user) => user.name === username);

        if (!user) throw new Error('No user found with this username');

        const passwordIsValid = bcrypt.compare(
            password,
            user.password
        );

        if (!passwordIsValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        return token;
    }

    getAllUsers(): User[] {

        let users: User[] = [];
        userDatabase.forEach((entry) => {
            let user: User = entry;
            users.push(user);
        });

        return users;
    }

    getUserById(id: string): User {
        // validate id
        const user = userDatabase.find((user) => user.id === id);

        if (!user) throw new Error('User not found');

        return user;
    }

    getPlaylists(id: string): Playlist[] {
        // validate id
        const user = this.getUserById(id);

        return user.playlists;
    }

    getPlaylistById(userId: string, listId): Playlist {
        // validate id
        const user = this.getUserById(userId);

        const playlist = user.playlists.find((pl) => pl.id === listId);

        if (!playlist) throw new Error(`User has no playlist with id ${listId}`);

        return playlist;

    }

    createNewPlaylist(userId: string, playlist: Playlist): User {

        const user = this.getUserById(userId);

        const newPlaylist: Playlist = { id: uuid.v1(), ...playlist }

        user.playlists.push(newPlaylist);

        return user;
    }

    addSongToList(userId: string, listId: string, song: Song): Playlist {

        let playlist = this.getPlaylistById(userId, listId)

        const newSong: Song = { ...song }

        playlist.songs.push(newSong);

        return playlist;
    }
}