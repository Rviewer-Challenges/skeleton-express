import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user';

const express = require('express')
const router = express.Router()

const userService = new UserService();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Time ", Date.now());
    next();
});

// get all lists for a user
router.get("/:userid/lists", async (req: Request, res: Response) => {
    const user: any = await userService.getUserById(req.currentUser, req.params.userid);
    if (user.code) {
        res.status(user.code).send(user);
    } else {
        const result: any = await userService.getPlaylists(user);
        try {
            res.status(200).send(result);
        } catch (e: any) {
            res.status(result.code).send(e.message);
        }
    }

});

// create a new list for user
router.post("/:userid/lists", async (req: Request, res: Response) => {
    const user: any = await userService.getUserById(req.currentUser, req.params.userid);
    if (user.code) {
        res.status(user.code).send(user);
    } else {
        const result: any = await userService.createNewPlaylist(user, req.body);
        try {
            res.status(200).send(result);
        } catch (e: any) {
            res.status(result.code).send(e.message)
        }
    }
});

// Get a specific list of a user
router.get("/:userid/:listId", async (req: Request, res: Response) => {
    const user: any = await userService.getUserById(req.currentUser, req.params.userid);
    if (user.code) {
        res.status(user.code).send(user);
    } else {
        const result: any = await userService.getPlaylistById(user, req.params.listId);
        try {
            res.status(200).send(result);
        } catch (e: any) {
            res.status(result.code).send(e.message)
        }
    }
});

// add song to a list
router.post("/:userid/lists/:listid/songs", async (req: Request, res: Response) => {
    const user: any = await userService.getUserById(req.currentUser, req.params.userid);
    if (user.code) {
        res.status(user.code).send(user);
    } else {
        const result: any = await userService.addSongToList(user, req.params.listid, req.body);
        try {
            res.status(200).send(result);
        } catch (e: any) {
            res.status(result.code).send(e.message)
        }
    }
});

module.exports = router;
