import { Application, Request, Response } from 'express';
import { PingService } from "../services/ping-service";

export const loadEndpoints = (app: Application): void => {
    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send(new PingService().getPing())
    });
};
