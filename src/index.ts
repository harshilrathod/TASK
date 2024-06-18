import express from 'express';
import * as dotenv from 'dotenv';
import { Constants } from './helpers/constants';
import morgan = require('morgan');
import { Routes } from './routes';
import connect from './connection';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
dotenv.config();
console.log(process.env.DB_URL)
export class App {
    protected app: express.Application;
    constructor() {
        console.log('connection',connect)
        this.app = express();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.all('/*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Request-Headers', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization'
            );
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT , DELETE'
            );

            // res.set('Cache-Control', 'no-store');
            // res.setHeader("Cache-Control", "public, no-cache");
            
            if (req.method === 'OPTIONS') {
                res.writeHead(Constants.SUCCESS_CODE);
                res.end();
            } else {
                next();
            }
        });
        this.app.use(morgan('dev'));
        this.app.use(
            fileUpload({
                parseNested: true,
            })
        );
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json({ limit: '50mb' }));
        const routes = new Routes();
        this.app.use('/', routes.path());
        this.app.listen(`${process.env.PORT || 4001}`, () => {
           console.log(
                `The server is running in port localhost: ${process.env.PORT}`
            );
        });
    }
}

new App();