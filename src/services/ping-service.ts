import { injectable } from "inversify";
import { Pong } from '../domain/pong';
import PingPongResponse from "../models/ping-pong-response";

@injectable()
export class PingService {

    async getPing(): Promise<PingPongResponse> {
        return (new Pong()).unmarshal()
    }
}
