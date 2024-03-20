import { config } from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

interface EnvironmentVariables extends NodeJS.ProcessEnv {
  NODE_ENV?: string;
  PORT?: string;
  ORIGIN?:string;
  LOG_FORMAT?:string;
  LOG_DIR?:string;
  JWT_SECRET?:string;
}

export const {
  NODE_ENV,
  PORT,
  ORIGIN,
  LOG_FORMAT,
  LOG_DIR,
  JWT_SECRET
}:EnvironmentVariables = process.env;

export abstract class ConfigServer {
  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
 }
}