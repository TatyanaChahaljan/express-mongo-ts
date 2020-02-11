import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Error } from 'mongoose';

export class UserService {

    public welcomeMessage(req: Request, res: Response) {
        res.status(200).send('WELCOME_MESSAGE');
    }

    public getAllUsers = (req: Request, res: Response) => {
        User.find((err: any, users: any) => {
            if (err) {
                res.send(err);
            } else {
                res.send(users);
            }
        });
    };

    public getUserById = (req: Request, res: Response) => {
        const id = req.params.id;
        User.findById(id, (err: any, user: any) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(user);
            }
        });
    };

    public addUser = (req: Request, res: Response) => {
        const user = new User(req.body);
        user.save().then((user) => {
            res.send(user);
        }).catch((err) => {
            if (err && err.errmsg) {
                res.send(err.errmsg);
            } else {
                res.send(err);
            }
        });
    };

    public deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;
        User.findByIdAndDelete({_id: id}, (err: Error, deleted: any) => {
            if (err) {
                res.send(err);
            }
            const message = deleted ? 'Deleted successfully' : 'User not found';
            res.send(message);
        });
    };
}