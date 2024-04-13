import 'reflect-metadata';
import express, {Application, NextFunction} from 'express';
import session from 'express-session';
import { Request, Response } from 'express';
import { ConfigServer, NODE_ENV, PORT } from './config/config';
import helmet from 'helmet';
import hpp from 'hpp';
//mport { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
import corsConfig from './config/cors.config';
import cors from 'cors';
import passport from './auth/controllers/auth.controller'
import { logger } from './utils/logger';
import { Routes } from './routes/interfaces/route.interface';
import { DataSource } from 'typeorm';
import { extractJWTToken } from './auth/middlewares/auth.middleware';
import path from 'path';

export class App extends ConfigServer {
  public app:Application; 
  public env:string;
  public port:number;

  constructor(routes:Routes[]) {
    super()
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = Number(PORT) || 3000;
  
    this.initializeMiddlewares();
    this.initSession();
    this.errorHandler();
    this.connectToDatabase();
    this.initializeRoutes(routes);
}

private initSession() {
  this.app.use(session({
    //genid: () => uuidv4(), // Use uuidv4() as the function to generate session IDs
    secret: 'user-session-first',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }  // Activate with https protocol
  })); 
  this.app.use(passport.initialize());
  this.app.use(passport.session());
}

private initializeMiddlewares() {
  this.app.use(express.json());
  this.app.use(express.urlencoded({ extended: true }));
  this.app.use(cors(corsConfig)); 
  this.app.use(hpp());
  this.app.use(helmet());
  this.app.use(express.static(path.join(__dirname, 'public')));
  this.app.use('/client', express.static(path.join(__dirname, 'public', 'client')));
  this.app.use('/profile', express.static(path.join(__dirname, 'public', 'profile')));
  this.app.set('view engine','pug');
  this.app.set('views', path.join(__dirname, 'views'));
  this.app.use(cookieParser());
  this.app.use(extractJWTToken);
}

public listener() {
  this.app.listen(this.port,() => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${this.env} =======`);
    logger.info(`🚀 App listening on port ${this.port}`);
    logger.info(`=================================`);
  } )
};

private errorHandler() {
  this.app.use((err:any, _req:Request, res:Response, _next:NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}

private async connectToDatabase(): Promise<DataSource | void> {
  // TODO: Init conexion
  return this.initConnect
    .then(() => {
      logger.info(`=================================`);
      logger.info(`🚀 DB Connection successfully!!`);
      logger.info(`=================================`);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

public initializeRoutes(routes: Routes[]) {
  routes.forEach((route) => {
    this.app.use(`/api/`, route.router);
  });
}
};

