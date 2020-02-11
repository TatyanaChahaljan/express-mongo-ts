import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { UserController } from './controllers/user.controller';

import { config } from 'dotenv';
import { resolve } from 'path';

config({path: resolve(__dirname, '../.env.development')});

class App {
    public app: any;
    private _availability = process.env.DB_USERNAME && process.env.DB_USERNAME ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}` : '';
    private _dbHost = process.env.DB_HOST;
    private _dbName = process.env.DB_NAME;


    // add used controllers
    public userController: UserController;

    constructor() {
        this.app = express();
        this._setConfig();
        this._setMongoConfig();

        this.userController = new UserController(this.app);
    }

    private _setConfig() {
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }

    private _setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(`mongodb://${this._availability}${this._dbHost}/${this._dbName}`, {
            useNewUrlParser: true
        }).then(() => {
            return console.log('Mongo connect success');
        }).catch(err => {
            return console.log('Error connection', err);
        });
    }

}

export default new App().app;