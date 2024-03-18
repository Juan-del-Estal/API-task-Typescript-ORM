import 'reflect-metadata';
import express, {Application} from 'express';
import session from 'express-session';
import { ConfigServer, NODE_ENV, PORT } from './config/config';
import helmet from 'helmet';
import hpp from 'hpp';
import { v4 as uuidv4 } from 'uuid';
import cookieParser from 'cookie-parser';
import corsConfig from './config/cors.config';
import cors from 'cors';
import passport from './auth/controllers/auth.controller'
import { logger } from './utils/logger';
import { Routes } from './routes/interfaces/route.interface';
import { DataSource } from 'typeorm';
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
    this.connectToDatabase();
    this.initializeRoutes(routes);
}

private initSession() {
  this.app.use(session({
    genid: () => uuidv4(), // Use uuidv4() as the function to generate session IDs
    secret: 'user-session-first',
    resave: false,
    saveUninitialized: true
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
  this.app.use(express.static(path.join(__dirname, 'client')));
  this.app.set('view engine','pug');
  this.app.set('views', path.join(__dirname, 'views'));
  this.app.use(cookieParser());
}

public listener() {
  this.app.listen(this.port,() => {
    logger.info(`=================================`);
    logger.info(`======= ENV: ${this.env} =======`);
    logger.info(`🚀 App listening on port ${this.port}`);
    logger.info(`=================================`);
  } )
};

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

