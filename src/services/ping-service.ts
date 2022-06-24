import { Pong } from "../domain/pong.js";

export class PingService {
    public getPing(): object {
        return (new Pong()).unmarshal()
    }
}
