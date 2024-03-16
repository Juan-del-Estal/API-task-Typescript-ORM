import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
const configDBConnection:  DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*.js"], // The key to run the migration!!!
  namingStrategy: new SnakeNamingStrategy()
};

export const AppDataSource: DataSource = new DataSource(configDBConnection);
