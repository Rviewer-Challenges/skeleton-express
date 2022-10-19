import PingPongResponse from "../models/ping-pong-response";

export class Pong {
    private message: string;

    constructor() {
        this.message = 'pong';
    }

    unmarshal(): PingPongResponse {
        return new PingPongResponse(this.message);
    }
}
