import { Application, NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../services/user';

const express = require('express')
const router = express.Router()

const userService = new UserService();

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Time ", Date.now());
    console.log(req.currentUser);
    next();
});

// get all lists for a user
router.get("/:userid/lists", (req: Request, res: Response) => {
    const result: any = userService.getPlaylists(req.currentUser, req.params.userid)
     try {
        res.status(200).send(result);
     } catch (e: any) {
        res.status(result.code).send(e.message)
     }
});

// create a new list for user
router.post("/:userid/lists", (req: Request, res: Response) => {
    const result: any = userService.createNewPlaylist(req.currentUser, req.params.userid, req.body);
    try {
        res.status(200).send(result);
     } catch (e: any) {
        res.status(result.code).send(e.message)
     }
});

// Get a specific list of a user
router.get("/:userid/:listId", (req: Request, res: Response) => {
    const result: any = userService.getPlaylistById(req.params.userid, req.params.listId, req.currentUser);
    try {
        res.status(200).send(result);
    } catch (e: any) {
        res.status(result.code).send(e.message)
    }
});

// add song to a list
router.post("/:userid/lists/:listid/songs", (req: Request, res: Response) => {
    const result: any = userService.addSongToList(req.currentUser, req.params.userid, req.params.listid, req.body);
    try {
        res.status(200).send(result);
    } catch (e: any) {
        res.status(result.code).send(e.message)
    }
});

module.exports = router;
