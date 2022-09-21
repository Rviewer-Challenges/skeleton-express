import { UserService } from "../../src/services/user";

const mockUser = {
    "id": "aaaa00",
    "name": "John Smith",
    "password": "!unsecu@edPard1234",
    "playlists": [
        {
            "id": "00001",
            "name": "pl1",
            "songs": [
                {
                    "artist": "artist1",
                    "title": "title1"
                }
            ]
        }
    ]
};

const mockPlaylist =  {
    "id": "00002",
    "name": "pl2",
    "songs": [
        {
            "artist": "artist1",
            "title": "title1"
        }
    ]
};

const mockSong = {
    "artist": "artist2",
    "title": "title2"
};

const mockcurrentUser = "aaaa00";


describe('usersService', () => {
    const userService = new UserService();

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('getUserById', () => {
        it('should return user', async () => {
            const result = await userService.getUserById(mockcurrentUser, mockUser.id);

            expect(result).toEqual(mockUser);
        });

        it('should return you are not authorized', async () => {
            const result = await userService.getUserById("fakeId", mockUser.id);

            expect(result).toEqual({ code: 401, message: 'You are not authorized.' });
        });

        it('should return user not found with this id', async () => {
            const result = await userService.getUserById("fakeId", "fakeId");

            expect(result).toEqual({ code: 401, message: "User not found with this id" });
        });
    });

    describe('getPlaylists', () => {
        it('should return users playlists', async () => {
            const result = await userService.getPlaylists(mockUser as any);

            expect(result).toEqual(mockUser.playlists);
        });
    });

    describe('getPlaylistById', () => {
        it('should return a playlist', async () => {
            const result = await userService.getPlaylistById(
                mockUser as any,
                mockUser.playlists[0].id as any
            );

            expect(result).toEqual(mockUser.playlists[0]);
        });

        it('should return user has no playlist with this id', async () => {
            const result = await userService.addSongToList(
                mockUser as any,
                "fakeId",
                mockSong as any
            );

            expect(result).toEqual({ code: 401, message: `User has no playlist with id fakeId` });
        });
    });

    describe('createNewPlaylist', () => {
        it('should create a new playlist', async () => {
            const result = await userService.createNewPlaylist(
                mockUser as any,
                mockPlaylist as any
            );

            expect(result).toEqual(mockPlaylist);
        });
    });

    describe('addSongToList', () => {
        it('should add a new song to playlist', async () => {
            const result = await userService.addSongToList(
                mockUser as any,
                "00001",
                mockSong as any
            );

            expect(result).toEqual(mockSong);
        });

        it('should return user has no playlist with this id', async () => {
            const result = await userService.addSongToList(
                mockUser as any,
                "fakeId",
                mockSong as any
            );

            expect(result).toEqual({ code: 401, message: `User has no playlist with id fakeId` });
        });
    });
 


});