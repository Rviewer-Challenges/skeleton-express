import { Application, Request, Response } from 'express';
import { UserService } from '../services/user';

export const loadEndpoints = (app: Application): void => {
    // get all users
    app.get("/users", (req: Request, res: Response) => {
        return res.status(200).send(new UserService().getAllUsers())
    });

    // get user by id
    app.get("/users/:id", (req: Request, res: Response) => {
        return res.send(new UserService().getUserById(req.params.id));
    });

    // get all lists for a user
    app.get("/users/:userid/lists", (req: Request, res: Response) => {
        return res.send(new UserService().getPlaylists(req.params.userid));
    });

    // create a new playlist for user
    app.post("/users/:userid/lists", (req: Request, res: Response) => {
        return res.send(new UserService().createNewPlaylist(req.params.userid, req.body))
    })

    // Get a specific list of a user
    app.get("/users/:userid/:listId", (req: Request, res: Response) => {
        return res.send(new UserService().getPlaylistById(req.params.userid, req.params.listId));
    });

    // add song to a list
    app.post("/users/:userid/lists/:listid/songs", (req: Request, res: Response) => {
        return res.send(new UserService().addSongToList(req.params.userid, req.params.listid, req.body))
    })

    // login user
    app.post("/users", (req: Request, res: Response) => {
        console.log(req.body)
        return res.send(new UserService().login(req.body))
    })
};
