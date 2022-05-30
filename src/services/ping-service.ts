import { Pong } from "../domain/Pong";

export class PingService {

    public getPing(): object {
        return new Pong().unmarshal()
    }
}
