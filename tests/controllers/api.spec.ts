import request from 'supertest';

import app from '../src/app';
import { Pong } from '../src/domain/Pong';

describe('GET /ping', () => {
    it('should return 200 OK', () => {
        return request(app).get('/ping').expect(200)
    });

    it('should return `pong` in response', () => {
        return request(app).get('/ping').expect(new Pong().unmarshal())
    });
});
