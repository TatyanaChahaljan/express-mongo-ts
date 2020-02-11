import { Router } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor(private app: Router) {
        this.userService = new UserService();
        this.routes();
    }

    public routes() {
        this.app.get('/', this.userService.welcomeMessage);
        this.app.get('/users', this.userService.getAllUsers);
        this.app.get('/users/:id', this.userService.getUserById);
        this.app.post('/users', this.userService.addUser);
        this.app.delete('/users/:id', this.userService.deleteUser);
    }
}