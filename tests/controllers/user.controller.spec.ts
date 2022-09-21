import supertest from 'supertest';
import app from "../../src/app";

describe('getAllListsForUser', () => {
    it('should return 200 OK', async () => {
        const response = await supertest(app)
        .get("/users/aaaa00/lists")
        .set({ Authorization: "Basic Sm9obiBTbWl0aDohdW5zZWN1QGVkUGFyZDEyMzQ=" })

        expect(response.statusCode).toBe(200)
    });

    it('should return 401 unauthorized', async () => {
        const response = await supertest(app)
        .get("/users/aaaa00/lists")
        .set({ Authorization: "fake" })

        expect(response.statusCode).toBe(401)
    });
});

describe('createNewListForUser', () => {

    const newList = {
        name: 'newList',
        songs: []
    }

    it('should return 200 OK', async () => {
        const response = await supertest(app)
        .post("/users/aaaa00/lists")
        .set({ Authorization: "Basic Sm9obiBTbWl0aDohdW5zZWN1QGVkUGFyZDEyMzQ=" })
        .send(newList)

        expect(response.statusCode).toBe(200)
    });

    it('should return 401 unauthorized', async () => {
        const response = await supertest(app)
        .post("/users/aaaa00/lists")
        .set({ Authorization: "fake" })
        .send(newList)

        expect(response.statusCode).toBe(401)
    });
});

describe('getAllListsForUser', () => {
    it('should return 200 OK', async () => {
        const response = await supertest(app)
        .get("/users/aaaa00/lists")
        .set({ Authorization: "Basic Sm9obiBTbWl0aDohdW5zZWN1QGVkUGFyZDEyMzQ=" })

        expect(response.statusCode).toBe(200)
    });

    it('should return 401 unauthorized', async () => {
        const response = await supertest(app)
        .get("/users/aaaa00/lists")
        .set({ Authorization: "fake" })

        expect(response.statusCode).toBe(401)
    });

});

describe('getListFromUser', () => {

    it('should return 200 OK', async () => {
        const response = await supertest(app)
        .get("/users/aaaa00/00001")
        .set({ Authorization: "Basic Sm9obiBTbWl0aDohdW5zZWN1QGVkUGFyZDEyMzQ=" })

        expect(response.statusCode).toBe(200)
    });

    it('should return 401 unauthorized', async () => {
        const response = await supertest(app)
        .post("/users/aaaa00/00001")
        .set({ Authorization: "fake" })

        expect(response.statusCode).toBe(401)
    });
});

describe('addSongToList', () => {

    const newSong = {
        artist: "newArtist",
        title: "newTitle"
    };

    it('should return 200 OK', async () => {
        const response = await supertest(app)
        .post("/users/aaaa00/lists/00001/songs")
        .set({ Authorization: "Basic Sm9obiBTbWl0aDohdW5zZWN1QGVkUGFyZDEyMzQ=" })
        .send(newSong)

        expect(response.statusCode).toBe(200)
    });

    it('should return 401 unauthorized', async () => {
        const response = await supertest(app)
        .post("/users/aaaa00/lists/00001/songs")
        .set({ Authorization: "fake" })
        .send(newSong)

        expect(response.statusCode).toBe(401)
    });
});